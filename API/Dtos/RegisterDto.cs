using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [RegularExpression("(?=.∗\\d)(?=.∗[a-z])(?=.∗[A-Z].{4,8}$)",ErrorMessage = "Weak Password")]
        public string Password { get; set; }
        [Required]
        public string UserName { get; set; }
    }
}