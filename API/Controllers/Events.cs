using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Core;
using Application.Events;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class Events : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Event>>> GetEvents()
        {
           var events = await Mediator.Send(new List.Querry());
           return events;
        }   

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEventById(Guid id)
        {
           var result = await Mediator.Send(new Details.Querry{Id= id});
           return HandleResult<Event>(result);

        }

        [HttpPost]
        public async Task<IActionResult> CreateEvent(Event Event)
        {
            return Ok(await Mediator.Send(new Create.Command{Event= Event}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditEvent(Guid id, Event Event)
        {
            Event.Id=id;
            return Ok(await Mediator.Send(new Edit.Command{Event = Event}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id= id}));
        }
    }
}