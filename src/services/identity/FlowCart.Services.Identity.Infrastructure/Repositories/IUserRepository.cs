using FlowCart.Services.Identity.Domain.Entities;
using FlowCart.Services.Identity.Domain.Interfaces;
using FlowCart.Services.Identity.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace FlowCart.Services.Identity.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _context;

    public UserRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<ApplicationUser?> GetByIdAsync(Guid id)
    {
        // Note: In a real scenario, we might use AutoMapper to map between 
        // IdentityApplicationUser and Domain.ApplicationUser
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
        if (user == null) return null;

        return new ApplicationUser
        {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email!,
            UserName = user.UserName!
        };
    }

    public async Task<ApplicationUser?> GetByEmailAsync(string email)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user == null) return null;

        return new ApplicationUser
        {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email!,
            UserName = user.UserName!
        };
    }

    public async Task AddAsync(ApplicationUser user)
    {
        // Logic to add to Identity system usually goes through UserManager,
        // but for pure repository patterns, we show the context approach here.
        // We will refine this once we implement the UserManager in the Handler.
    }

    public async Task UpdateAsync(ApplicationUser user)
    {
        _context.Entry(user).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }
}