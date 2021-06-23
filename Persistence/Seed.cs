using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Events.Any()) return;
            
            var activities = new List<Event>
            {
                new Event
                {
                    Title = "Event 1",
                    Date = DateTime.Now.AddMonths(-2),
                    Description = "Event 2 months ago",
                    Categories= "Meteor",
                    Region = "London"
                },
                new Event
                {
                    Title = "Event 2",
                    Date = DateTime.Now.AddMonths(-1),
                    Description = "Event one month ago",
                    Categories= "Meteor",
                    Region = "London"
                },
                new Event
                {
                    Title = "Event 3",
                    Date = DateTime.Now.AddMonths(1),
                    Description = "Event one month in the futur",
                    Categories= "Eclipse",
                    Region = "London"
                },
                 new Event
                {
                    Title = "Event 4",
                    Date = DateTime.Now.AddMonths(2),
                    Description = "Event 2 months in the futur",
                    Categories= "Meteor",
                    Region = "London"
                },
                new Event
                {
                    Title = "Event 5",
                    Date = DateTime.Now.AddMonths(3),
                    Description = "Event 3 months in the futur",
                    Categories= "Meteor",
                    Region = "London"
                },




            };

            await context.Events.AddRangeAsync(activities);
            await context.SaveChangesAsync();
        }
    }
}