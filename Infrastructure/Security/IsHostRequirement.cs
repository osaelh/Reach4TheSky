using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement
    {
        
    }

    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public IsHostRequirementHandler(DataContext context, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _dbContext = context;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Task.CompletedTask;
            }

            var eventId = Guid.Parse(_httpContextAccessor.HttpContext?.Request.RouteValues
                              .SingleOrDefault(x => x.Key == "id").Value.ToString());
          
            var interestee = _dbContext.EventInterestees
                                       .AsNoTracking()
                                       .SingleOrDefaultAsync(x => x.EventId == eventId &&  x.UserId == userId)
                                       .Result;

            if (interestee == null)
            {
                return Task.CompletedTask;
            }

            if(interestee.IsHost) context.Succeed(requirement);
            return Task.CompletedTask;
        }
    }
}