using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace StudyWithGroup.Core.Entities
{
    public class GroupEntity : BaseEntity
    {
        public GroupEntity()
        {
            this.Users = new HashSet<UserEntity>();
        }
        
        public string Name { get; set; }

        public virtual List<MessageEntity> Messages { get; set; }

        //public Guid EventId { get; set; }
        //[ForeignKey(nameof(EventId))]
        //[InverseProperty("Groups")]
        public virtual EventEntity Event { get; set; }

        public virtual ICollection<UserEntity> Users { get; set; }
    }
}
