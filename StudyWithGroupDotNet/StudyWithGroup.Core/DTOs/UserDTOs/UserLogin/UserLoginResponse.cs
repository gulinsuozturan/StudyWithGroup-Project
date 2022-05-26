using StudyWithGroup.Core.Entities;
using System;
using System.Text.Json.Serialization;

namespace StudyWithGroup.Core.DTOs.UserDTOs.UserLogin
{
    public class UserLoginResponse
    {
        public Guid Id { get; set; }
        public string JwtToken { get; set; }
        [JsonIgnore]
        public string RefreshToken { get; set; }

        public UserLoginResponse(UserEntity user, string jwtToken, string refreshToken)
        {
            Id = user.Id;
            JwtToken = jwtToken;
            RefreshToken = refreshToken;
        }
    }
}
