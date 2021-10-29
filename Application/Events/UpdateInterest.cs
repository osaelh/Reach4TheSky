using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events
{
    public class UpdateInterest
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
           private readonly DataContext _context;
           private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
            _userAccessor = userAccessor;
            _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
               var events = await _context.Events
               .Include(a => a.Interestees).ThenInclude(u => u.User)
               .FirstOrDefaultAsync(x => x.Id == request.Id);

               if(events == null) return null;

               var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());

               if(user == null) return null;

               var hostUsername = events.Interestees.FirstOrDefault(x => x.IsHost)?.User?.UserName;

               var interest = events.Interestees.FirstOrDefault(x=> x.User.UserName == user.UserName);

               if(interest != null && hostUsername == user.UserName)
                   events.IsCancelled = !events.IsCancelled;
                   
               if (interest != null && hostUsername != user.UserName)
               {
                   events.Interestees.Remove(interest);
               }    
               
               if (interest == null )
               {
                   interest = new EventInterestee 
                   {
                       User = user,
                       Event = events,
                       IsHost = false
                   };
                   events.Interestees.Add(interest);
               }

               var result = await _context.SaveChangesAsync() > 0;
               return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating the event");
            }
        }
    }
}