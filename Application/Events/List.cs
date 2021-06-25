using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events
{
    public class List
    {
        public class Querry : IRequest<List<Event>> { }

        public class Handler : IRequestHandler<Querry, List<Event>>
        {
            private readonly DataContext _dataContext;
            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<List<Event>> Handle(Querry request, CancellationToken cancellationToken)
            {
                return await _dataContext.Events.ToListAsync();
            }
        }
    }
}