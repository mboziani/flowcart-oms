using FlowCart.Services.Identity.Application.DTOs;
using FlowCart.Services.Identity.Application.Features.Auth.Commands;
using FlowCart.Services.Identity.Application.Interfaces;
using FluentAssertions;
using Moq;
using Xunit;

namespace FlowCart.Services.Identity.UnitTests;

public class LoginUserHandlerTests
{
    private readonly Mock<IIdentityService> _identityServiceMock;
    private readonly LoginUserHandler _handler;

    public LoginUserHandlerTests()
    {
        _identityServiceMock = new Mock<IIdentityService>();
        _handler = new LoginUserHandler(_identityServiceMock.Object);
    }

    [Fact]
    public async Task Handle_ValidCommand_ReturnsAuthResponse()
    {
        // Arrange
        var command = new LoginUserCommand("john@test.com", "Password123!");
        var expectedResponse = new AuthResponse("token123", "refresh123", DateTime.UtcNow.AddDays(1), command.Email, "johndoe");

        _identityServiceMock.Setup(s => s.LoginAsync(command.Email, command.Password))
            .ReturnsAsync(expectedResponse);

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.Should().NotBeNull();
        result.Token.Should().Be("token123");
        result.RefreshToken.Should().Be("refresh123");
        result.Email.Should().Be(command.Email);
        result.UserName.Should().Be("johndoe");

        _identityServiceMock.Verify(s => s.LoginAsync(command.Email, command.Password), Times.Once);
    }
}
