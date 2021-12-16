using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<User>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Event> Events { get; set; }
        public DbSet<EventInterestee> EventInterestees { get; set; }
        public DbSet<Photo> Photos { get ; set; }
        public DbSet<Comment> Comments { get; set; }



        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<EventInterestee>(x => x.HasKey(ua =>
                new { ua.UserId, ua.EventId }));

            builder.Entity<EventInterestee>()
                .HasOne(u => u.User)
                .WithMany(a => a.Interestees)
                .HasForeignKey(u => u.UserId);

            builder.Entity<EventInterestee>()
                .HasOne(a => a.Event)
                .WithMany(u => u.Interestees)
                .HasForeignKey(a => a.EventId);

            builder.Entity<Comment>()
                 .HasOne(e => e.Event)
                 .WithMany(c => c.Comments)
                 .OnDelete(DeleteBehavior.Cascade);
        }
    }
}