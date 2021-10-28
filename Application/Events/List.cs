using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
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
        public class Querry : IRequest<Result<List<EventDto>>> { }

        public class Handler : IRequestHandler<Querry, Result<List<EventDto>>>
        {
            private readonly DataContext _dataContext;
            private readonly IMapper _mapper;
            public Handler(DataContext dataContext, IMapper mapper)
            {
                _mapper = mapper;
                _dataContext = dataContext;
            }

            public async Task<Result<List<EventDto>>> Handle(Querry request, CancellationToken cancellationToken)
            {
                var events = await _dataContext.Events
                .ProjectTo<EventDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

                return Result<List<EventDto>>.Success(events);
            }
        }
    }
}