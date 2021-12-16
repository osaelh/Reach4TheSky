using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
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
    public class List
    {
        public class Querry : IRequest<Result<List<CommentDto>>>
        {
            public Guid EventID { get; set; }
        }

        public class Handler : IRequestHandler<Querry, Result<List<CommentDto>>>
        {
            private readonly DataContext _Context;
            private readonly IMapper _Mapper;
            public Handler(DataContext context,
                           IMapper mapper)
            {
                _Context = context;
                _Mapper = mapper;
            }
            public async Task<Result<List<CommentDto>>> Handle(Querry request, CancellationToken cancellationToken)
            {
/*              var Event = await _Context.Events.FindAsync(request.EventID);
                if (Event == null) return null;
                var comments = Event.Comments;
                var comtsDto = _Mapper.Map<CommentDto>(comments);*/
                var comments = await _Context.Comments.Where(x => x.Event.Id == request.EventID)
                     .OrderByDescending(x => x.CreatedAt)
                     .ProjectTo<CommentDto>(_Mapper.ConfigurationProvider)
                     .ToListAsync();

                return Result<List<CommentDto>>.Success(comments);
            }
        }
    }
}
