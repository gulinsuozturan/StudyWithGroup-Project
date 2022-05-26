using StudyWithGroup.Core.Entities;
using System;

namespace StudyWithGroup.Core.DTOs.UserDTOs.UserRegister
{
    public class UserRegisterResponse
    {
        public Guid Id { get; set; }
        public string Email { get; set; }

        public UserRegisterResponse(UserEntity user)
        {
            Id = user.Id;
            Email = user.Email;
        }
    }
}
