using FlowCart.Services.Identity.Application.DTOs;
using FlowCart.Services.Identity.Application.Features.Auth.Commands;
using FlowCart.Services.Identity.Application.Interfaces;
using FluentAssertions;
using Moq;
using Xunit;

namespace FlowCart.Services.Identity.UnitTests;

public class RegisterUserHandlerTests
{
    private readonly Mock<IIdentityService> _identityServiceMock;
    private readonly RegisterUserHandler _handler;

    public RegisterUserHandlerTests()
    {
        _identityServiceMock = new Mock<IIdentityService>();
        _handler = new RegisterUserHandler(_identityServiceMock.Object);
    }

    [Fact]
    public async Task Handle_ValidCommand_ReturnsAuthResponse()
    {
        // Arrange
        var command = new RegisterUserCommand("John", "Doe", "john@test.com", "johndoe", "Password123!");
        var expectedResponse = new AuthResponse("token123", "refresh123", DateTime.UtcNow.AddDays(1), command.Email, command.UserName);

        _identityServiceMock.Setup(s => s.RegisterAsync(command.FirstName, command.LastName, command.Email, command.UserName, command.Password))
            .ReturnsAsync(expectedResponse);

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.Should().NotBeNull();
        result.Token.Should().Be("token123");
        result.RefreshToken.Should().Be("refresh123");
        result.Email.Should().Be(command.Email);

        _identityServiceMock.Verify(s => s.RegisterAsync(command.FirstName, command.LastName, command.Email, command.UserName, command.Password), Times.Once);
    }
}
