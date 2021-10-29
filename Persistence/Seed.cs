using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
            UserManager<User> userManager)
        {
            if (!userManager.Users.Any() && !context.Events.Any())
            {
                var users = new List<User>
                {
                    new User
                    {
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com"
                    },
                    new User
                    {
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com"
                    },
                    new User
                    {
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                var events = new List<Event>
                {
                    new Event
                    {
                        Title = "Past Event 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Event 2 months ago",
                        Categories = "Meteor",
                        Region = "Morroco",
                        Interestees = new List<EventInterestee>
                        {
                            new EventInterestee
                            {
                                User = users[0],
                                IsHost = true
                            }
                        }
                    },
                    new Event
                    {
                        Title = "Past Event 2",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = "Event 1 month ago",
                        Categories = "Solar and lunar eclipses",
                        Region = "Paris",
                        Interestees = new List<EventInterestee>
                        {
                            new EventInterestee
                            {
                                User = users[0],
                                IsHost = true
                            },
                            new EventInterestee
                            {
                                User = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Event
                    {
                        Title = "Future Event 1",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "Event 1 month in future",
                        Categories = "Comet flybys",
                        Region = "London",
                        Interestees = new List<EventInterestee>
                        {
                            new EventInterestee
                            {
                                User = users[2],
                                IsHost = true
                            },
                            new EventInterestee
                            {
                                User = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Event
                    {
                        Title = "Future Event 2",
                        Date = DateTime.Now.AddMonths(2),
                        Description = "Event 2 months in future",
                        Categories = "Solstices",
                        Region = "Rabat",
                        Interestees = new List<EventInterestee>
                        {
                            new EventInterestee
                            {
                                User = users[0],
                                IsHost = true
                            },
                            new EventInterestee
                            {
                                User = users[2],
                                IsHost = false
                            },
                        }
                    },
                    new Event
                    {
                        Title = "Future Event 3",
                        Date = DateTime.Now.AddMonths(3),
                        Description = "Event 3 months in future",
                        Categories = "Comet flybys",
                        Region = "Tangier",
                        Interestees = new List<EventInterestee>
                        {
                            new EventInterestee
                            {
                                User = users[1],
                                IsHost = true                            
                            },
                            new EventInterestee
                            {
                                User = users[0],
                                IsHost = false                            
                            },
                        }
                    },
                    new Event
                    {
                        Title = "Future Event 4",
                        Date = DateTime.Now.AddMonths(4),
                        Description = "Event 4 months in future",
                        Categories = "Solstices",
                        Region = "Amesterdam",
                        Interestees = new List<EventInterestee>
                        {
                            new EventInterestee
                            {
                                User = users[1],
                                IsHost = true                            
                            }
                        }
                    },
                    new Event
                    {
                        Title = "Future Event 5",
                        Date = DateTime.Now.AddMonths(5),
                        Description = "Event 5 months in future",
                        Categories = "Meteor",
                        Region = "Dubai",
                        Interestees = new List<EventInterestee>
                        {
                            new EventInterestee
                            {
                                User = users[0],
                                IsHost = true                            
                            },
                            new EventInterestee
                            {
                                User = users[1],
                                IsHost = false                            
                            },
                        }
                    },
                    new Event
                    {
                        Title = "Future Event 6",
                        Date = DateTime.Now.AddMonths(6),
                        Description = "Event 6 months in future",
                        Categories = "Meteor",
                        Region = "London",
                        Interestees = new List<EventInterestee>
                        {
                            new EventInterestee
                            {
                                User = users[2],
                                IsHost = true                            
                            },
                            new EventInterestee
                            {
                                User = users[1],
                                IsHost = false                            
                            },
                        }
                    },
                    new Event
                    {
                        Title = "Future Event 7",
                        Date = DateTime.Now.AddMonths(7),
                        Description = "Event 7 months in future",
                        Categories = "Solstices",
                        Region = "Berlin",
                        Interestees = new List<EventInterestee>
                        {
                            new EventInterestee
                            {
                                User = users[0],
                                IsHost = true                            
                            },
                            new EventInterestee
                            {
                                User = users[2],
                                IsHost = false                            
                            },
                        }
                    },
                    new Event
                    {
                        Title = "Future Event 8",
                        Date = DateTime.Now.AddMonths(8),
                        Description = "Event 8 months in future",
                        Categories = "Meteor",
                        Region = "Boston",
                        Interestees = new List<EventInterestee>
                        {
                            new EventInterestee
                            {
                                User = users[2],
                                IsHost = true                            
                            },
                            new EventInterestee
                            {
                                User = users[1],
                                IsHost = false                            
                            },
                        }
                    }
                };

                await context.Events.AddRangeAsync(events);
                await context.SaveChangesAsync();
            }
        }
    }
}
