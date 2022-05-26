using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace StudyWithGroup.Core.Entities
{
    public class MessageEntity : BaseEntity
    {
        
        public string Content { get; set; }

        public Guid GroupID { get; set; }
        [ForeignKey("GroupID")]
        public GroupEntity Group { get; set; }

        public Guid UserID { get; set; }
        [ForeignKey("UserID")]
        public UserEntity User { get; set; }
    }
}
