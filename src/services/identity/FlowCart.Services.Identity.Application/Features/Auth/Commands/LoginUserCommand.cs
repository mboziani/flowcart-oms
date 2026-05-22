using FlowCart.Services.Identity.Application.DTOs;
using MediatR;

namespace FlowCart.Services.Identity.Application.Features.Auth.Commands;

public record LoginUserCommand(string Email, string Password) : IRequest<AuthResponse>;
