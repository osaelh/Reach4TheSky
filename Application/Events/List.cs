using System.Collections.Generic;
using System.Linq;
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
        public class Querry : IRequest<Result<PagedList<EventDto>>> 
        {
            public PagingParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Querry, Result<PagedList<EventDto>>>
        {
            private readonly DataContext _dataContext;
            private readonly IMapper _mapper;
            public Handler(DataContext dataContext, IMapper mapper)
            {
                _mapper = mapper;
                _dataContext = dataContext;
            }

            public async Task<Result<PagedList<EventDto>>> Handle(Querry request, CancellationToken cancellationToken)
            {
                var querry = _dataContext.Events
                .OrderBy(d => d.Date)

                .ProjectTo<EventDto>(_mapper.ConfigurationProvider)
                .AsQueryable();

                return Result<PagedList<EventDto>>.Success(
                    await PagedList<EventDto>.CreateAsync(querry, request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}