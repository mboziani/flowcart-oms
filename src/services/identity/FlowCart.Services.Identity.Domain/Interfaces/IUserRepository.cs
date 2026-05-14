using FlowCart.Services.Identity.Domain.Entities;

namespace FlowCart.Services.Identity.Domain.Interfaces;

public interface IUserRepository
{
    Task<ApplicationUser?> GetByIdAsync(Guid id);
    Task<ApplicationUser?> GetByEmailAsync(string email);
    Task AddAsync(ApplicationUser user);
    Task UpdateAsync(ApplicationUser user);
}