using System.ComponentModel.DataAnnotations;

namespace StudyWithGroup.Core.DTOs.UserDTOs.UserLogin
{
    public class UserLoginRequest
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
