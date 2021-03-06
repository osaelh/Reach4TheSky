using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class User : IdentityUser
    {
        public string DisplayName { get; set; } 
        public string Bio { get; set; }
        public ICollection<EventInterestee> Interestees { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>(); 
    }
}