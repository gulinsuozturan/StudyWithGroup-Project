using StudyWithGroup.Core.DTOs;
using StudyWithGroup.Core.DTOs.UserDTOs.UserLogin;
using StudyWithGroup.Core.DTOs.UserDTOs.UserRegister;
using System;

namespace StudyWithGroup.Core.Interfaces.Services
{
    public interface IUserService
    {
        public ResultModel<object> Login(UserLoginRequest request);
        public ResultModel<object> Register(UserRegisterRequest request);
        public ResultModel<object> Get(Guid request);
    }
}
