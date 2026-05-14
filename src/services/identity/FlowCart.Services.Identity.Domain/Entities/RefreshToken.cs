using FlowCart.Services.Identity.Domain.Common;

namespace FlowCart.Services.Identity.Domain.Entities;

public class RefreshToken : BaseEntity
{
    public string Token { get; set; } = string.Empty;
    public DateTime ExpiresAt { get; set; }
    public bool IsExpired => DateTime.UtcNow >= ExpiresAt;
    public DateTime? RevokedAt { get; set; }
    public bool IsActive => RevokedAt == null && !IsExpired;
    
    public Guid UserId { get; set; }
    public virtual ApplicationUser User { get; set; } = null!;
}