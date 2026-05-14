namespace FlowCart.Services.Identity.Application.DTOs;

public record AuthResponse(
    string Token,
    string RefreshToken,
    DateTime ExpiresAt,
    string Email,
    string UserName
);