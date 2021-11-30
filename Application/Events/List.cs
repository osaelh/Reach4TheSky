using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events
{
    public class List
    {
        public class Querry : IRequest<Result<PagedList<EventDto>>> 
        {
            public EventParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Querry, Result<PagedList<EventDto>>>
        {
            private readonly DataContext _dataContext;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext dataContext, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _dataContext = dataContext;
            }

            public async Task<Result<PagedList<EventDto>>> Handle(Querry request, CancellationToken cancellationToken)
            {
                var querry = _dataContext.Events
                .Where(d => d.Date >= request.Params.StartAt)
                .OrderBy(d => d.Date)
                .ProjectTo<EventDto>(_mapper.ConfigurationProvider)
                .AsQueryable();

                if(request.Params.IsGoing && !request.Params.IsHost) {
                    querry = querry.Where(x => x.Interestees.Any(a => a.Username == _userAccessor.GetUserName()));
                }

                if(request.Params.IsHost && !request.Params.IsGoing) {
                    querry = querry.Where(x => x.HostUsername == _userAccessor.GetUserName());
                }

                return Result<PagedList<EventDto>>.Success(
                    await PagedList<EventDto>.CreateAsync(querry, request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}