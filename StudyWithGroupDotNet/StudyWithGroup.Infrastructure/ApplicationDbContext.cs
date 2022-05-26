using Microsoft.EntityFrameworkCore;
using StudyWithGroup.Core.Entities;

namespace StudyWithGroup.Infrastructure
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<UserEntity> Users { get; set; }
        public DbSet<EventEntity> Events { get; set; }
        public DbSet<GroupEntity> Groups { get; set; }
        public DbSet<MessageEntity> Messages { get; set; }
    }
}
