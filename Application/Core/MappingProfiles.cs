using System.Linq;
using Application.Events;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Event, Event>();
            CreateMap<Event, EventDto>()
            .ForMember(d => d.HostUsername, o => o.MapFrom(s => s.Interestees.FirstOrDefault(x => x.IsHost).User.UserName));
            CreateMap<EventInterestee, Profiles.Profile>()
              .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.User.DisplayName))
              .ForMember(d => d.Username, o => o.MapFrom(s => s.User.UserName))
              .ForMember(d => d.Bio, o => o.MapFrom(s => s.User.Bio));
        }
    }
}