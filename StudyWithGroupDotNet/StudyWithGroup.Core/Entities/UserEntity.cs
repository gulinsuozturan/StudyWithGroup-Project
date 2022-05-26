using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace StudyWithGroup.Core.Entities
{
    public class UserEntity : BaseEntity
    {
        public UserEntity()
        {
            this.Groups = new HashSet<GroupEntity>();
        }

        public string Email { get; set; }
        public string Password { get; set; }

        [JsonIgnore]
        public string RefreshToken { get; set; }
        [JsonIgnore]
        public DateTime? RefreshTokenExpireDate { get; set; }

        public virtual ICollection<GroupEntity> Groups { get; set; }
    }
}
