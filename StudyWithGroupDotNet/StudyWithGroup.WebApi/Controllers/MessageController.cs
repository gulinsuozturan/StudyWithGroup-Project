using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudyWithGroup.Core.DTOs;
using StudyWithGroup.Core.DTOs.MessageDTOs.Send;
using StudyWithGroup.Core.Interfaces.Services;
using System;
using System.Security.Claims;

namespace StudyWithGroup.WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/[controller]")]
    public class MessageController : Controller
    {
        private readonly IMessageService _messageService;

        public MessageController(IMessageService messageService)
        {
            _messageService = messageService;
        }

        [HttpPost("Send")]
        public ResultModel<object> Send([FromBody] SendMessageRequest request)
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            request.UserID = Guid.Parse(claimsIdentity.FindFirst(ClaimTypes.Name).Value);

            var result = _messageService.SendMessage(request);

            return result;
        }

        [HttpGet("Get")]
        public ResultModel<object> Get(Guid groupId)
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var userId = Guid.Parse(claimsIdentity.FindFirst(ClaimTypes.Name).Value);

            var result = _messageService.GetMessages(userId, groupId);

            return result;
        }
    }
}
