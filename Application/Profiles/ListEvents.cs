using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ListEvents
    {
        public class Querry : IRequest<Result<List<UserEventDto>>> 
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Querry, Result<List<UserEventDto>>>
        {
            private readonly IMapper _mapper;
            private readonly DataContext _dataContext;
            public Handler(DataContext dataContext, IMapper mapper)
            {
            _dataContext = dataContext;
            _mapper = mapper;

            }
            public async Task<Result<List<UserEventDto>>> Handle(Querry request, CancellationToken cancellationToken)
            {
                var querry = _dataContext.EventInterestees
                     .Where(u => u.User.UserName == request.Username)
                     .OrderBy(d => d.Event.Date)
                     .ProjectTo<UserEventDto>(_mapper.ConfigurationProvider)
                     .AsQueryable();
                
                querry = request.Predicate switch 
                {
                    "past" => querry.Where(d => d.Date <= DateTime.Now),
                    "host" => querry.Where(a => a.HostUsername == request.Username),
                    _ => querry.Where(d => d.Date >= DateTime.Now)
                };

                var events = await querry.ToListAsync();

                return Result<List<UserEventDto>>.Success(events);
            }
        }
    }
}