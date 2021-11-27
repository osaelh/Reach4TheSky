using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Comments
{
    public class Create
    {
        public class Command : IRequest<Result<CommentDto>>
        {
            public string Body { get; set; }
            public Guid EventId { get; set; }

        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Body).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<CommentDto>>
        {
            private readonly DataContext _DataContext;
            private readonly IUserAccessor _UserAccessor;
            private readonly IMapper _Mapper;

            public Handler(DataContext dataContext, IUserAccessor userAccessor, IMapper mapper)
            {
                _DataContext = dataContext;
                _UserAccessor = userAccessor;
                _Mapper = mapper;
            }
            public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var commentEvent = await _DataContext.Events.FindAsync(request.EventId);

                if (commentEvent == null) return null;

                var user = await _DataContext.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.UserName == _UserAccessor.GetUserName());

                var comment = new Comment
                {
                    Body = request.Body,
                    Author = user,
                    Event = commentEvent
                };

                commentEvent.Comments.Add(comment);

                var result = await _DataContext.SaveChangesAsync() > 0;

                if (result)
                {
                    return Result<CommentDto>.Success(_Mapper.Map<CommentDto>(comment));
                }

                return Result<CommentDto>.Failure("Failed to add comment");

            }
        }
    }
}
