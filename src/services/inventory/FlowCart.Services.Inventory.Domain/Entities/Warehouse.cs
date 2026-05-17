namespace FlowCart.Services.Inventory.Domain.Entities;

public class Warehouse
{
    public Guid Id { get; private set; }
    public string Name { get; private set; } = string.Empty;
    public string Location { get; private set; } = string.Empty;
    public bool IsActive { get; private set; }

    private Warehouse() { } // EF Core

    public Warehouse(Guid id, string name, string location)
    {
        Id = id;
        Name = name;
        Location = location;
        IsActive = true;
    }

    public void Deactivate()
    {
        IsActive = false;
    }
}
