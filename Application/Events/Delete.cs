using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Events
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>> 
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _dataContext;

            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
               var Event = await _dataContext.Events.FindAsync(request.Id);
            //    if (Event == null)
            //    {
            //        return null;
            //    }
               _dataContext.Remove(Event);
                var result = await _dataContext.SaveChangesAsync() > 0;
                if (!result)
                {
                    return Result<Unit>.Failure("Failed to delete the event");
                }
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}