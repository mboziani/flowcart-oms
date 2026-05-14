using FlowCart.Services.Identity.Application.DTOs;
using FlowCart.Services.Identity.Application.Interfaces;
using MediatR;

namespace FlowCart.Services.Identity.Application.Features.Auth.Commands;

public class RegisterUserHandler : IRequestHandler<RegisterUserCommand, AuthResponse>
{
    private readonly IIdentityService _identityService;

    public RegisterUserHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<AuthResponse> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
    {
        return await _identityService.RegisterAsync(
            request.FirstName, 
            request.LastName, 
            request.Email, 
            request.UserName, 
            request.Password);
    }
}