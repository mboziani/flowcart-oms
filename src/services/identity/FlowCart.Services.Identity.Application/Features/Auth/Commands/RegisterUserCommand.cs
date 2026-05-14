using FlowCart.Services.Identity.Application.DTOs;
using MediatR;

namespace FlowCart.Services.Identity.Application.Features.Auth.Commands;

public record RegisterUserCommand(
    string FirstName,
    string LastName,
    string Email,
    string UserName,
    string Password
) : IRequest<AuthResponse>;