using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudyWithGroup.Core.DTOs;
using StudyWithGroup.Core.DTOs.EventDTOs.Create;
using StudyWithGroup.Core.Interfaces.Services;
using System;
using System.Security.Claims;

namespace StudyWithGroup.WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/[controller]")]
    public class EventController : Controller
    {
        private readonly IEventService _eventService;

        public EventController(IEventService eventService)
        {
            _eventService = eventService;
        }

        [HttpPost("Create")]
        public ResultModel<object> Create([FromBody] CreateRequest request)
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            request.UserID = Guid.Parse(claimsIdentity.FindFirst(ClaimTypes.Name).Value);

            var result = _eventService.Create(request);
            
            return result;
        }

        [HttpGet("Get")]
        public ResultModel<object> Get(DateTime date)
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var userId = Guid.Parse(claimsIdentity.FindFirst(ClaimTypes.Name).Value);

            var result = _eventService.Get(userId, date);

            return result;
        }

    }
}
