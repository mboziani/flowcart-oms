using FlowCart.Services.Identity.Infrastructure;
using FlowCart.Services.Identity.Application;
using FlowCart.Services.Identity.Infrastructure.Persistence;
using FlowCart.Services.Identity.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register Layers
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddApplication(); // Added missing call

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}
app.UseAuthorization();
app.MapControllers();

// Initialize Database and Seed Test Account
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<ApplicationDbContext>();
        context.Database.Migrate();

        var userManager = services.GetRequiredService<UserManager<IdentityApplicationUser>>();
        var testEmail = "admin@flowcart.local";
        if (await userManager.FindByEmailAsync(testEmail) == null)
        {
            var user = new IdentityApplicationUser
            {
                UserName = "admin_user",
                Email = testEmail,
                FirstName = "System",
                LastName = "Admin",
                EmailConfirmed = true
            };
            await userManager.CreateAsync(user, "Password123!");
        }
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while migrating or seeding the database.");
    }
}

app.Run();