using FlowCart.Services.Identity.Application.DTOs;
using FlowCart.Services.Identity.Application.Interfaces;
using FlowCart.Services.Identity.Infrastructure.Identity;
using FlowCart.Services.Identity.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace FlowCart.Services.Identity.Infrastructure.Services;

public class IdentityService : IIdentityService
{
    private readonly UserManager<IdentityApplicationUser> _userManager;
    private readonly ITokenService _tokenService;

    public IdentityService(UserManager<IdentityApplicationUser> userManager, ITokenService tokenService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
    }

    public async Task<AuthResponse> RegisterAsync(string firstName, string lastName, string email, string userName, string password)
    {
        var existingUser = await _userManager.FindByEmailAsync(email);
        if (existingUser != null)
            throw new Exception("User already exists.");

        var identityUser = new IdentityApplicationUser
        {
            FirstName = firstName,
            LastName = lastName,
            Email = email,
            UserName = userName
        };

        var result = await _userManager.CreateAsync(identityUser, password);
        if (!result.Succeeded)
            throw new Exception($"Failed: {string.Join(", ", result.Errors.Select(e => e.Description))}");

        var domainUser = new ApplicationUser
        {
            Id = identityUser.Id,
            FirstName = identityUser.FirstName,
            LastName = identityUser.LastName,
            Email = identityUser.Email!,
            UserName = identityUser.UserName!
        };

        return new AuthResponse(
            Token: _tokenService.GenerateJwtToken(domainUser),
            RefreshToken: _tokenService.GenerateRefreshToken(),
            ExpiresAt: DateTime.UtcNow.AddMinutes(60),
            Email: domainUser.Email,
            UserName: domainUser.UserName
        );
    }

    public async Task<AuthResponse> LoginAsync(string email, string password)
    {
        var existingUser = await _userManager.FindByEmailAsync(email);
        if (existingUser == null)
            throw new Exception("Invalid credentials.");

        var isValidPassword = await _userManager.CheckPasswordAsync(existingUser, password);
        if (!isValidPassword)
            throw new Exception("Invalid credentials.");

        var domainUser = new ApplicationUser
        {
            Id = existingUser.Id,
            FirstName = existingUser.FirstName,
            LastName = existingUser.LastName,
            Email = existingUser.Email!,
            UserName = existingUser.UserName!
        };

        return new AuthResponse(
            Token: _tokenService.GenerateJwtToken(domainUser),
            RefreshToken: _tokenService.GenerateRefreshToken(),
            ExpiresAt: DateTime.UtcNow.AddMinutes(60),
            Email: domainUser.Email,
            UserName: domainUser.UserName
        );
    }
}