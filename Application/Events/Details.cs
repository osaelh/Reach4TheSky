using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Events
{
    public class Details
    {
        public class Querry : IRequest<Result<Event>> 
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Querry, Result<Event>>
        {
            private readonly DataContext _dataContext;

            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<Result<Event>> Handle(Querry request, CancellationToken cancellationToken)
            {
                var result =  await _dataContext.Events.FindAsync(request.Id);
                return Result<Event>.Success(result);
            }
        }
    }
}