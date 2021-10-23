using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Core;
using Application.Events;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class Events : BaseApiController
    {

        [HttpGet]
        public async Task<IActionResult> GetEvents()
        {
            return HandleResult(await Mediator.Send(new List.Querry()));
        }   

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEventById(Guid id)
        {
           var result = await Mediator.Send(new Details.Querry{Id= id});
           return HandleResult<Event>(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateEvent(Event Event)
        {
            return HandleResult<Unit>(await Mediator.Send(new Create.Command{Event= Event}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditEvent(Guid id, Event Event)
        {
            Event.Id=id;
            return HandleResult(await Mediator.Send(new Edit.Command{Event = Event}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id= id}));
        }
    }
}