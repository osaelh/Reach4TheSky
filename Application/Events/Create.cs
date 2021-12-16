using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>> 
        {
            public Event Event { get; set; }

        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x=>x.Event).SetValidator(new EventValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _dataContext;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext dataContext, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _dataContext = dataContext;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _dataContext.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());

                var interestee = new EventInterestee 
                {
                    UserId = user.Id,
                    EventId = request.Event.Id,
                    IsHost = true
                };

                request.Event.Interestees.Add(interestee);

                _dataContext.Add(request.Event);
                
                var result = await _dataContext.SaveChangesAsync() > 0;

                if (!result)
                {
                    return Result<Unit>.Failure("Failed to create event");
                }
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}