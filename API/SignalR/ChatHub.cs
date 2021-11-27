using Application.Comments;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace API.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator _mediatR;
        public ChatHub(IMediator mediatoR)
        {
            _mediatR = mediatoR;
        }

        public async Task SendComment(Create.Command command)
        {
            var comment = await _mediatR.Send(command);

            await Clients.Group(command.EventId.ToString()).SendAsync("ReceiveComment", comment.Value);
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var eventId = httpContext.Request.Query["EventID"];
            await Groups.AddToGroupAsync(Context.ConnectionId, eventId);
            var result = await _mediatR.Send(new List.Querry { EventID = Guid.Parse(eventId) });
            await Clients.Caller.SendAsync("LoadComments", result.Value);
        }
    }
}
