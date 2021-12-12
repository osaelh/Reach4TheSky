using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class Profiles : BaseApiController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            return HandleResult(await Mediator.Send(new Details.Querry{Username = username}));
        }
        [HttpGet("{username}/events")]
        public async Task<IActionResult> GetUserEvents(string username, string predicate)
        {
            return HandleResult(await Mediator.Send(new ListEvents.Querry{Username = username, Predicate = predicate}));
        }

        [HttpPut]
        public async Task<IActionResult> Update(Update.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }
    }
}