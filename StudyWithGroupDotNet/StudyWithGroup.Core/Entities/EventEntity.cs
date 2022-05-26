using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace StudyWithGroup.Core.Entities
{
    public class EventEntity : BaseEntity
    {
        public DateTime StartDate { get; set; }
        public DateTime AlarmDate { get; set; }
        public bool IsOn { get; set; }
        public string Color { get; set; }
        public string Description { get; set; }
        public string Title { get; set; }

        [ForeignKey(nameof(GroupId))]
        public Guid GroupId { get; set; }


        //[InverseProperty(nameof(GroupEntity.Event))]
        //public virtual ICollection<GroupEntity> Groups { get; set; }
    }
}
