using System.Linq;
using Application.Comments;
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
            CreateMap<EventInterestee, InteresteeDto>()
              .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.User.DisplayName))
              .ForMember(d => d.Username, o => o.MapFrom(s => s.User.UserName))
              .ForMember(d => d.Bio, o => o.MapFrom(s => s.User.Bio))
              .ForMember(d => d.Image, o => o.MapFrom(s => s.User.Photos.FirstOrDefault(p => p.IsMain).Url));

            CreateMap<User, Profiles.Profile>()
            .ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(p => p.IsMain).Url));

            CreateMap<Comment, CommentDto>()
              .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName))
              .ForMember(d => d.Username, o => o.MapFrom(s => s.Author.UserName))
              .ForMember(d => d.Image, o => o.MapFrom(s => s.Author.Photos.FirstOrDefault(p => p.IsMain).Url));
              
        }
    }
}