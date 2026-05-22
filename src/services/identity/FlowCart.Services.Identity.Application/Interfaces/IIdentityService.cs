using FlowCart.Services.Identity.Application.DTOs;

namespace FlowCart.Services.Identity.Application.Interfaces;

public interface IIdentityService
{
    Task<AuthResponse> RegisterAsync(string firstName, string lastName, string email, string userName, string password);
    Task<AuthResponse> LoginAsync(string email, string password);
}