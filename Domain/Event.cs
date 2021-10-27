using System;
using System.Collections.Generic;

namespace Domain
{
    public class Event
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public string Region { get; set; }
        public string Categories { get; set; }
        public ICollection<EventInterestee> Interestees { get; set; } = new List<EventInterestee>();
    }
}