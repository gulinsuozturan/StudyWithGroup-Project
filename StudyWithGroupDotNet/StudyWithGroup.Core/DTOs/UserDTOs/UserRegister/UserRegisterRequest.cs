using System.ComponentModel.DataAnnotations;

namespace StudyWithGroup.Core.DTOs.UserDTOs.UserRegister
{
    public class UserRegisterRequest
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
