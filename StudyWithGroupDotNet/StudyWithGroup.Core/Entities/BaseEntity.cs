using StudyWithGroup.Core.Interfaces.Entities;
using System;

namespace StudyWithGroup.Core.Entities
{
    public abstract class BaseEntity : IEntity<Guid>
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public bool IsActive { get; set; } = true;
        public DateTime Created { get; set; } = DateTime.Now;
        public string Creator { get; set; } = "System";
    }
}
