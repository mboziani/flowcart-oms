using FlowCart.Services.Identity.Domain.Common;

namespace FlowCart.Services.Identity.Domain.Entities;

public class ApplicationUser : BaseEntity
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string UserName { get; set; } = string.Empty;
    
    // Identity related properties (to be synchronized with IdentityUser)
    public bool IsActive { get; set; } = true;
    
    // Navigation properties
    public virtual ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
}