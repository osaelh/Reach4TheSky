using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.Events
{
    public class EventValidator : AbstractValidator<Event>
    {
        public EventValidator()
        {
            RuleFor(x=>x.Title).NotEmpty();
            RuleFor(x=>x.Categories).NotEmpty();
            RuleFor(x=>x.Date).NotEmpty();
            RuleFor(x=>x.Description).NotEmpty();
            RuleFor(x=>x.Region).NotEmpty();
        }
    }
}