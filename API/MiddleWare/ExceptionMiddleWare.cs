using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Application.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API.MiddleWare
{
    public class ExceptionMiddleWare
    {
        public IHostEnvironment Env { get; }
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleWare> _logger;
        private readonly IHostEnvironment _env;
        public ExceptionMiddleWare(RequestDelegate next, ILogger<ExceptionMiddleWare> logger,
         IHostEnvironment env)
        {
            _env = env;
            _logger = logger;
            _next = next;
            Env = env;

        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                 await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;

                var response = _env.IsDevelopment()
                   ? new AppException(context.Response.StatusCode,  ex.Message, ex.StackTrace?.ToString())
                   : new AppException(context.Response.StatusCode,"Server error" );

                    var options = new JsonSerializerOptions{PropertyNamingPolicy= JsonNamingPolicy.CamelCase};
                    var json = JsonSerializer.Serialize(response, options);

                    await context.Response.WriteAsync(json);

                
            }
        }
    }
}