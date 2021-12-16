using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Comment
    {
        public int Id { get; set; }
        public string Body { get; set; }
        public User Author { get; set; }
        public Event Event { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    }
}