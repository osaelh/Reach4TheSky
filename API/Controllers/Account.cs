using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using System.Net.Http;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;
using Infrastructure.Email;
using Microsoft.AspNetCore.WebUtilities;
using System.Text;

namespace API.Controllers
{
    [ApiController]
    [Route("/api/[Controller]")]
    public class Account : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;

        private readonly TokenService _tokenService;
        private readonly HttpClient _httpClient;
        private readonly EmailSender _emailSender;
        public Account(UserManager<User> userManager,
         SignInManager<User> signInManager,
         IConfiguration configuration,
         TokenService tokenService,
         EmailSender emailSender)
        {
            _configuration = configuration;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
            _emailSender = emailSender;
            _httpClient = new HttpClient 
            {
                BaseAddress = new System.Uri("https://graph.facebook.com")
            };
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.Email == loginDto.Email);
            if (user == null)
            {
                return Unauthorized("Invalid email");
            }

            if(user.EmailConfirmed is false) return Unauthorized("Please confirm email");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if(result.Succeeded)
            {
                await SetRefreshToken(user);

                return new UserDto
                {
                    DisplayName= user.DisplayName,
                    Image = user?.Photos?.FirstOrDefault(x => x.IsMain)?.Url,
                    Token = _tokenService.CreateToken(user),
                    UserName = user.UserName
                };
            }
            return Unauthorized("Invalid password");
        } 

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _userManager.Users.AnyAsync(x=> x.Email == registerDto.Email))
            {
                ModelState.AddModelError("email", "Email taken");
                return ValidationProblem();
            }
            if (await _userManager.Users.AnyAsync(x=> x.UserName == registerDto.UserName))
            {
                ModelState.AddModelError("username", "Username taken");
                return ValidationProblem();
            }

            var user = new User
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.UserName
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            // if(result.Succeeded)
            // {
            //     await SetRefreshToken(user);

            //     return new UserDto 
            //     {
            //         DisplayName = user.DisplayName,
            //         Image = user?.Photos?.FirstOrDefault(x => x.IsMain)?.Url,
            //         UserName = user.UserName,
            //         Token = _tokenService.CreateToken(user)
            //     };
            // }

            // return BadRequest("Problem in registration");
            if(result.Succeeded is false) return BadRequest("Problem registring User");

            var origin = Request.Headers["origin"];
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

            var verifyUrl = $"{origin}/account/verifyEmail?token={token}&email={user.Email}";
            var message = $"<p>Please click the below link to verify your email address:</p><p><a href='{verifyUrl}'>Click to verify email</a></p>";

            await _emailSender.SendEmailAsync(user.Email, "Please verify email", message);

            return Ok("Registration success - please verify email");
        }

                [AllowAnonymous]
        [HttpPost("verifyEmail")]
        public async Task<IActionResult> VerifyEmail(string token, string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) return Unauthorized();
            var decodedTokenBytes = WebEncoders.Base64UrlDecode(token);
            var decodedToken = Encoding.UTF8.GetString(decodedTokenBytes);
            var result = await _userManager.ConfirmEmailAsync(user, decodedToken);

            if (!result.Succeeded) return BadRequest("Could not verify email address");

            return Ok("Email confirmed - you can now login");
        }

        [AllowAnonymous]
        [HttpGet("resendEmailConfirmationLink")]
        public async Task<IActionResult> ResendEmailConfirmationLink(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null) return Unauthorized();

            var origin = Request.Headers["origin"];
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

            var verifyUrl = $"{origin}/account/verifyEmail?token={token}&email={user.Email}";
            var message = $"<p>Please click the below link to verify your email address:</p><p><a href='{verifyUrl}'>Click to verify email</a></p>";

            await _emailSender.SendEmailAsync(user.Email, "Please verify email", message);

            return Ok("Email verification link resent");
        }
         
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

            return  new UserDto 
                {
                    DisplayName = user.DisplayName,
                    Image = user?.Photos?.FirstOrDefault(x => x.IsMain)?.Url,
                    UserName = user.UserName,
                    Token = _tokenService.CreateToken(user)
                };
        }
        
        [AllowAnonymous]
        [HttpPost("fbLogin")]
        public async Task<ActionResult<UserDto>> FacebookLogin(string accessToken)
        {
            var fbVerifyKeys = _configuration["Facebook:AppId"] + "|" + _configuration["Facebook:AppSecret"];

            var verifyToken = await _httpClient.GetAsync($"debug_token?input_token={accessToken}&access_token={fbVerifyKeys}");

            if(!verifyToken.IsSuccessStatusCode) return Unauthorized();

            var fbUrl = $"me?access_token={accessToken}&fields=name,email,picture.width(100).height(100)";

            var response = await _httpClient.GetAsync(fbUrl);

            if(!response.IsSuccessStatusCode) return Unauthorized();

            var content = await response.Content.ReadAsStringAsync();

            var fbInfo = JsonConvert.DeserializeObject<dynamic>(content);

            var username = (string)fbInfo.id;

            var user = await _userManager.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.UserName == username);

            if(user != null) {
                return  new UserDto 
                {
                    DisplayName = user.DisplayName,
                    Image = user?.Photos?.FirstOrDefault(x => x.IsMain)?.Url,
                    UserName = user.UserName,
                    Token = _tokenService.CreateToken(user)
                };
            }

            user =  new User
            {
                DisplayName = (string) fbInfo.name,
                Email = (string)fbInfo.email,
                UserName = (string)fbInfo.id,
                Photos = new List<Photo> 
                {
                    new Photo 
                    {
                        Id = "fb_" + (string)fbInfo.id,
                        Url = (string)fbInfo.picture.data.url,
                        IsMain = true
                    }
                }
            };

            user.EmailConfirmed = true;

            var result = await _userManager.CreateAsync(user);

            if(!result.Succeeded) return BadRequest("Problem creating user account");

            await SetRefreshToken(user);

            return  new UserDto 
                {
                    DisplayName = user.DisplayName,
                    Image = user?.Photos?.FirstOrDefault(x => x.IsMain)?.Url,
                    UserName = user.UserName,
                    Token = _tokenService.CreateToken(user)
                };

        }

        [Authorize]
        [HttpPost("refreshToken")]
        public async Task<ActionResult<UserDto>> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            var user = await _userManager.Users.Include(r => r.RefreshTokens).Include(p => p.Photos)
              .FirstOrDefaultAsync(x => x.UserName == User.FindFirstValue(ClaimsIdentity.DefaultNameClaimType));

            if(user == null) return Unauthorized();

            var oldtoken = user.RefreshTokens.SingleOrDefault(x => x.Token == refreshToken);

            if(oldtoken != null && !oldtoken.IsActive) return Unauthorized();
            
            return  new UserDto 
                {
                    DisplayName = user.DisplayName,
                    Image = user?.Photos?.FirstOrDefault(x => x.IsMain)?.Url,
                    UserName = user.UserName,
                    Token = _tokenService.CreateToken(user)
                };
        } 

        private async Task SetRefreshToken(User user)
        {
            var refreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshTokens.Add(refreshToken);
            await _userManager.UpdateAsync(user);

            var cookieOpt = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(7)
            };

            Response.Cookies.Append("refreshToken", refreshToken.Token, cookieOpt);
        }
    }
}