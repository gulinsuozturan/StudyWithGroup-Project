using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudyWithGroup.Core.DTOs;
using StudyWithGroup.Core.Interfaces.Services;
using System.Security.Claims;
using System;
using StudyWithGroup.Core.DTOs.GroupDTOs.Join;

namespace StudyWithGroup.WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/[controller]")]

    public class GroupController : Controller
    {
        private readonly IGroupService _groupService;

        public GroupController(IGroupService groupService)
        {
            _groupService = groupService;
        }

        [HttpGet("Get")]
        public ResultModel<object> GetGroups()
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var userId = Guid.Parse(claimsIdentity.FindFirst(ClaimTypes.Name).Value);

            var result = _groupService.GetGroups(userId);

            return result;
        }

        [HttpGet("GetAllGroups")]
        public ResultModel<object> GetAllGroups()
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var userId = Guid.Parse(claimsIdentity.FindFirst(ClaimTypes.Name).Value);

            var result = _groupService.GetAllGroups(userId);

            return result;
        }

        [HttpGet("GetDetails")]
        public ResultModel<object> GetDetails(Guid groupId)
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var userId = Guid.Parse(claimsIdentity.FindFirst(ClaimTypes.Name).Value);

            var result = _groupService.GetDetails(userId, groupId);
            
            return result;
        }

        [HttpPost("Join")]
        public ResultModel<object> Join([FromBody] GroupJoinRequest request)
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var userId = Guid.Parse(claimsIdentity.FindFirst(ClaimTypes.Name).Value);

            var result = _groupService.Join(userId, request.GroupID);

            return result;
        }
    }
}
