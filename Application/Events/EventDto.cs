using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Profiles;

namespace Application.Events
{
    public class EventDto
    {
         public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public string Region { get; set; }
        public string Categories { get; set; }
        public string HostUsername { get; set; }
          public bool IsCancelled { get; set; }
        public ICollection<InteresteeDto> Interestees { get; set; }
    }
}