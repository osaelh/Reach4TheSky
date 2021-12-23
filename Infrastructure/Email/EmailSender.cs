using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Infrastructure.Email
{
    public class EmailSender
    {
        private readonly IConfiguration _config;
        public EmailSender(IConfiguration config)
        {
            _config = config;
            
        }

        public async Task SendEmailAsync(string useremail, string emailSubject, string messageBody)
        {
            var sendgridUser = _config["SendGrid:User"];
            var client = new SendGridClient(_config["SendGrid:Key"]);
            var message = new SendGridMessage
            {
                From = new EmailAddress("oussamaelh@gmail.com", _config["SendGrid:User"]),
                Subject = emailSubject,
                PlainTextContent = messageBody,
                HtmlContent = messageBody
            };
            message.AddTo(new EmailAddress(useremail));
            message.SetClickTracking(false, false);

            await client.SendEmailAsync(message);
        }
    }
}