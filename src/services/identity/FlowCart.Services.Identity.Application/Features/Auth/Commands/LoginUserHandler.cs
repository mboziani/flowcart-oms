using FlowCart.Services.Identity.Application.DTOs;
using FlowCart.Services.Identity.Application.Interfaces;
using MediatR;

namespace FlowCart.Services.Identity.Application.Features.Auth.Commands;

public class LoginUserHandler : IRequestHandler<LoginUserCommand, AuthResponse>
{
    private readonly IIdentityService _identityService;

    public LoginUserHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<AuthResponse> Handle(LoginUserCommand request, CancellationToken cancellationToken)
    {
        return await _identityService.LoginAsync(request.Email, request.Password);
    }
}
