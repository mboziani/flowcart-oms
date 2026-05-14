using Microsoft.AspNetCore.Identity;

namespace FlowCart.Services.Identity.Infrastructure.Identity;

public class IdentityApplicationUser : IdentityUser<Guid>
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
}