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
<<<<<<< HEAD
=======
using Microsoft.Extensions.Configuration;
using System.Net.Http;
using Newtonsoft.Json;
>>>>>>> FbLogin

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("/api/[Controller]")]
    public class Account : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
<<<<<<< HEAD

        private readonly TokenService _tokenService;
        public Account(UserManager<User> userManager,
         SignInManager<User> signInManager,

         TokenService tokenService)
        {
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
=======
        private readonly IConfiguration _configuration;

        private readonly TokenService _tokenService;
        private readonly HttpClient _httpClient;
        public Account(UserManager<User> userManager,
         SignInManager<User> signInManager,
         IConfiguration configuration,
         TokenService tokenService)
        {
            _configuration = configuration;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
            _httpClient = new HttpClient 
            {
                BaseAddress = new System.Uri("https://graph.facebook.com")
            };
>>>>>>> FbLogin
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.Email == loginDto.Email);
            if (user == null)
            {
                return Unauthorized();
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if(result.Succeeded)
            {
                return new UserDto
                {
                    DisplayName= user.DisplayName,
                    Image = user?.Photos?.FirstOrDefault(x => x.IsMain)?.Url,
                    Token = _tokenService.CreateToken(user),
                    UserName = user.UserName
                };
            }
            return Unauthorized();
        } 

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

            if(result.Succeeded)
            {
                return new UserDto 
                {
                    DisplayName = user.DisplayName,
                    Image = user?.Photos?.FirstOrDefault(x => x.IsMain)?.Url,
                    UserName = user.UserName,
                    Token = _tokenService.CreateToken(user)
                };
            }

            return BadRequest("Problem in registration");
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
<<<<<<< HEAD
=======
        
        [HttpPost("fbLogin")]
        public async Task<ActionResult<UserDto>> FacebookLogin(string accessToken)
        {
            var fbVerifyKeys = _configuration["Facebook:AppId"] + "|" + _configuration["Facebook:AppSecret"];

            var verifyToken = await _httpClient.GetAsync($"debug_token?input_token={accessToken}&access_token={fbVerifyKeys}");

            if(!verifyToken.IsSuccessStatusCode) return Unauthorized();
;
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

            var result = await _userManager.CreateAsync(user);

            if(!result.Succeeded) return BadRequest("Problem creating user account");

            return  new UserDto 
                {
                    DisplayName = user.DisplayName,
                    Image = user?.Photos?.FirstOrDefault(x => x.IsMain)?.Url,
                    UserName = user.UserName,
                    Token = _tokenService.CreateToken(user)
                };

        }
>>>>>>> FbLogin
    }
}