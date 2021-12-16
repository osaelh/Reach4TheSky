using System;
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
    public class Details
    {
        public class Querry : IRequest<Result<EventDto>> 
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Querry, Result<EventDto>>
        {
            private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

            public Handler(DataContext dataContext, IMapper mapper)
            {
            _mapper = mapper;
                _dataContext = dataContext;
            }

            public async Task<Result<EventDto>> Handle(Querry request, CancellationToken cancellationToken)
            {
                var result =  await _dataContext.Events
                .ProjectTo<EventDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id);
                return Result<EventDto>.Success(result);
            }
        }
    }
}