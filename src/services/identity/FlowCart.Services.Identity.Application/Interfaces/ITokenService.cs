using FlowCart.Services.Identity.Domain.Entities;

namespace FlowCart.Services.Identity.Application.Interfaces;

public interface ITokenService
{
    string GenerateJwtToken(ApplicationUser user);
    string GenerateRefreshToken();
}