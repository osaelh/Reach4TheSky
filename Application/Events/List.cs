using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events
{
    public class List
    {
        public class Querry : IRequest<Result<List<Event>>> { }

        public class Handler : IRequestHandler<Querry, Result<List<Event>>>
        {
            private readonly DataContext _dataContext;
            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<Result<List<Event>>> Handle(Querry request, CancellationToken cancellationToken)
            {
                return Result<List<Event>>.Success(await _dataContext.Events.ToListAsync());
            }
        }
    }
}