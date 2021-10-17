using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Events
{
    public class Edit
    {
        public class Command : IRequest
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

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _dataContext;
            private readonly IMapper _mapper;

            public Handler(DataContext dataContext, IMapper mapper)
            {
                _dataContext = dataContext;
                _mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
              var Event = await _dataContext.Events.FindAsync(request.Event.Id);

            //   Event.Title = request.Event.Title ?? Event.Title;
            //   Event.Description = request.Event.Description ?? Event.Description;
            //   Event.Categories = request.Event.Categories ?? Event.Categories;

             _mapper.Map(request.Event, Event);

              await _dataContext.SaveChangesAsync();
              return Unit.Value;

            }
        }
    }
}