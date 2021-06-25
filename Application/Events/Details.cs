using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Events
{
    public class Details
    {
        public class Querry : IRequest<Event> 
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Querry, Event>
        {
            private readonly DataContext _dataContext;

            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<Event> Handle(Querry request, CancellationToken cancellationToken)
            {
                return await _dataContext.Events.FindAsync(request.Id);
            }
        }
    }
}