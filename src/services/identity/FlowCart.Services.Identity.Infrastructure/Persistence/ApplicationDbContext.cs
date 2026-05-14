using FlowCart.Services.Identity.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FlowCart.Services.Identity.Infrastructure.Persistence;

public class ApplicationDbContext : IdentityDbContext<IdentityApplicationUser, IdentityRole<Guid>, Guid>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        
        // Custom configurations can go here
        builder.Entity<IdentityApplicationUser>(entity =>
        {
            entity.ToTable(name: "Users");
        });
    }
}