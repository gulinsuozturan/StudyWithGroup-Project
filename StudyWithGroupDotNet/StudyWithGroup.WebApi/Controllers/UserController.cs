using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudyWithGroup.Core.DTOs;
using StudyWithGroup.Core.DTOs.UserDTOs.UserLogin;
using StudyWithGroup.Core.DTOs.UserDTOs.UserRegister;
using StudyWithGroup.Core.Interfaces.Services;
using System;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace StudyWithGroup.WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("Login")]
        public ResultModel<object> Login([FromBody] UserLoginRequest request)
        {
            var result = _userService.Login(request);

            if (result.success)
                SetTokenCookie(((UserLoginResponse)result.data).RefreshToken);

            return result;
        }

        [AllowAnonymous]
        [HttpPost("Register")]
        public ResultModel<object> Register([FromBody] UserRegisterRequest request)
        {
            var result = _userService.Register(request);
            return result;
        }

        private void SetTokenCookie(string token)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.Now.AddDays(60)
            };

            Response.Cookies.Append("refreshToken", token, cookieOptions);
        }

        [HttpGet("Get")]
        public ResultModel<object> Get()
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var userId = Guid.Parse(claimsIdentity.FindFirst(ClaimTypes.Name).Value);

            var result = _userService.Get(userId);

            return result;
        }
    }
}
