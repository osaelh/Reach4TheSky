using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class EventInterestee
    {
        public string UserId { get; set; }
        public User User { get; set; }
        public Guid EventId { get; set; }
        public Event Event  { get; set;}
        public bool IsHost { get; set; }
    }
}