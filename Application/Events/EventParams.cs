using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;

namespace Application.Events
{
    public class EventParams : PagingParams
    {
        public bool IsGoing { get; set; }
        public bool IsHost { get; set; }
        public DateTime StartAt { get; set; } =  DateTime.UtcNow;
    }
}