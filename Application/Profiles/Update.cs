using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Persistence;

namespace Application.Profiles
{
    public class Update
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string DisplayName { get; set; }
            public string Bio { get; set; }
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
                var user = _dataContext.Users.FirstOrDefault(u => u.NormalizedUserName == _userAccessor.GetUserName().ToUpper());

                user.DisplayName = request.DisplayName ?? user.DisplayName;
                user.Bio = request.Bio ?? user.Bio;

                var result = await _dataContext.SaveChangesAsync() > 0;

                if(result) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Failed to update profile");
                
            }
        }
    }
}