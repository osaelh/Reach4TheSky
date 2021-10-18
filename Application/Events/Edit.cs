using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Events
{
    public class Edit
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
            private readonly IMapper _mapper;

            public Handler(DataContext dataContext, IMapper mapper)
            {
                _dataContext = dataContext;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
              var Event = await _dataContext.Events.FindAsync(request.Event.Id);

              if (Event == null )
              {
                  return null;
              }

             _mapper.Map(request.Event, Event);

              var result = await _dataContext.SaveChangesAsync();
              if (result == 0)
              {
                  return Result<Unit>.Failure("Failed to edit the event");
              }
              return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}