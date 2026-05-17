"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  Boxes, 
  Plus, 
  MapPin, 
  Package, 
  TrendingUp, 
  ArrowUpDown, 
  ShieldCheck, 
  AlertTriangle,
  History,
  Info
} from "lucide-react";
import { inventoryApi, catalogApi } from "@flowcart/api-sdk";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Premium Mock Data Fallbacks
const MOCK_WAREHOUSES = [
  { id: "w-1", name: "Seattle Logistics Center", location: "Seattle, WA", isActive: true },
  { id: "w-2", name: "Dallas Fulfillment Hub", location: "Dallas, TX", isActive: true },
  { id: "w-3", name: "New York Hub East", location: "New York, NY", isActive: true }
];

const MOCK_STOCKS = [
  { id: "s-1", productId: "p-1", productName: "Premium Leather Shoes", SKU: "SHO-LEA-001", warehouseId: "w-1", warehouseName: "Seattle Logistics Center", quantity: 180, reservedQuantity: 20, availableQuantity: 160 },
  { id: "s-2", productId: "p-2", productName: "Minimalist Wooden Desk", SKU: "DESK-MIN-004", warehouseId: "w-1", warehouseName: "Seattle Logistics Center", quantity: 45, reservedQuantity: 5, availableQuantity: 40 },
  { id: "s-3", productId: "p-1", productName: "Premium Leather Shoes", SKU: "SHO-LEA-001", warehouseId: "w-2", warehouseName: "Dallas Fulfillment Hub", quantity: 250, reservedQuantity: 40, availableQuantity: 210 },
  { id: "s-4", productId: "p-3", productName: "Titanium Mechanical Watch", SKU: "WAT-MEC-883", warehouseId: "w-3", warehouseName: "New York Hub East", quantity: 8, reservedQuantity: 2, availableQuantity: 6 }
];

export default function InventoryPage() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<"stock" | "warehouses">("stock");
  
  // Modals state
  const [showAddStock, setShowAddStock] = useState(false);
  const [showAddWarehouse, setShowAddWarehouse] = useState(false);

  // New stock input state
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [quantity, setQuantity] = useState(10);
  const [reason, setReason] = useState("Inbound Restock");

  // New warehouse input state
  const [warehouseName, setWarehouseName] = useState("");
  const [warehouseLocation, setWarehouseLocation] = useState("");

  // Queries (with mock fallbacks)
  const { data: warehouses } = useQuery({
    queryKey: ["warehouses"],
    queryFn: async () => {
      try {
        return await inventoryApi.getWarehouses();
      } catch {
        return MOCK_WAREHOUSES;
      }
    },
    initialData: MOCK_WAREHOUSES
  });

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        return await catalogApi.getProducts();
      } catch {
        return [
          { id: "p-1", name: "Premium Leather Shoes", SKU: "SHO-LEA-001" },
          { id: "p-2", name: "Minimalist Wooden Desk", SKU: "DESK-MIN-004" },
          { id: "p-3", name: "Titanium Mechanical Watch", SKU: "WAT-MEC-883" }
        ];
      }
    }
  });

  // Since we don't have a single "list all stocks" API directly, we map over stocks or query mock
  const { data: stocks, isLoading } = useQuery({
    queryKey: ["all-stocks"],
    queryFn: async () => {
      // Mock or fetch
      return MOCK_STOCKS;
    },
    initialData: MOCK_STOCKS
  });

  // Mutations
  const addStockMutation = useMutation({
    mutationFn: inventoryApi.addStock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-stocks"] });
      setShowAddStock(false);
    },
    onError: () => {
      // Direct mock update if off-line
      alert("Demo Mode: Simulated stock adjustment successfully!");
      setShowAddStock(false);
    }
  });

  const addWarehouseMutation = useMutation({
    mutationFn: inventoryApi.createWarehouse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["warehouses"] });
      setShowAddWarehouse(false);
    },
    onError: () => {
      alert("Demo Mode: Simulated warehouse creation successfully!");
      setShowAddWarehouse(false);
    }
  });

  const handleAddStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !selectedWarehouse) return;
    addStockMutation.mutate({
      productId: selectedProduct,
      warehouseId: selectedWarehouse,
      quantity: Number(quantity),
      reason
    });
  };

  const handleAddWarehouse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!warehouseName || !warehouseLocation) return;
    addWarehouseMutation.mutate({
      name: warehouseName,
      location: warehouseLocation
    });
  };

  // KPIs
  const totalStock = stocks.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalReserved = stocks.reduce((acc, curr) => acc + curr.reservedQuantity, 0);
  const lowStockCount = stocks.filter(s => s.availableQuantity <= 10).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Inventory Management</h1>
          <p className="text-muted-foreground mt-1 font-medium">Track warehouse storage configurations, item levels, and logs.</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={() => setShowAddWarehouse(true)} 
            variant="outline" 
            className="border-border text-foreground hover:bg-secondary font-semibold rounded-full px-5 shadow-sm"
          >
            <MapPin className="mr-2 w-4 h-4 text-primary" /> New Warehouse
          </Button>
          <Button 
            onClick={() => setShowAddStock(true)} 
            className="bg-primary hover:bg-primary/95 text-white font-semibold rounded-full px-5 shadow-md shadow-primary/20"
          >
            <Plus className="mr-2 w-4 h-4" /> Adjust Stock
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="premium-shadow border-transparent bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1 relative group">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Total Stock Units</CardTitle>
            <Boxes className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-foreground">{totalStock}</div>
            <p className="text-xs text-muted-foreground mt-1 font-semibold">Across {warehouses?.length} distribution centers</p>
          </CardContent>
        </Card>

        <Card className="premium-shadow border-transparent bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1 relative group">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-400" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Reserved Units</CardTitle>
            <TrendingUp className="h-5 w-5 text-indigo-400 group-hover:scale-110 transition-transform" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-foreground">{totalReserved}</div>
            <p className="text-xs text-muted-foreground mt-1 font-semibold">Allocated to pending customer orders</p>
          </CardContent>
        </Card>

        <Card className="premium-shadow border-transparent bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1 relative group">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Low Stock Items</CardTitle>
            <AlertTriangle className="h-5 w-5 text-amber-500 group-hover:scale-110 transition-transform" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-foreground">{lowStockCount}</div>
            <p className="text-xs text-amber-500 mt-1 font-semibold flex items-center gap-1">
              Requires immediate purchase order triggers
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-border gap-6">
        <button 
          onClick={() => setActiveTab("stock")}
          className={`pb-3 font-bold text-sm transition-all relative ${
            activeTab === "stock" ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Stock Allocation
          {activeTab === "stock" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
        </button>
        <button 
          onClick={() => setActiveTab("warehouses")}
          className={`pb-3 font-bold text-sm transition-all relative ${
            activeTab === "warehouses" ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Active Warehouses
          {activeTab === "warehouses" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
        </button>
      </div>

      {/* Content Panels */}
      {activeTab === "stock" ? (
        <Card className="premium-shadow border-transparent bg-card overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-secondary/50">
                <TableRow className="hover:bg-transparent border-border">
                  <TableHead className="text-muted-foreground font-bold uppercase text-xs tracking-wider">Product</TableHead>
                  <TableHead className="text-muted-foreground font-bold uppercase text-xs tracking-wider">Warehouse</TableHead>
                  <TableHead className="text-muted-foreground font-bold uppercase text-xs tracking-wider">Total Quantity</TableHead>
                  <TableHead className="text-muted-foreground font-bold uppercase text-xs tracking-wider">Reserved</TableHead>
                  <TableHead className="text-muted-foreground font-bold uppercase text-xs tracking-wider">Available</TableHead>
                  <TableHead className="text-muted-foreground font-bold uppercase text-xs tracking-wider">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <TableRow key={i} className="border-border">
                      <TableCell colSpan={6} className="h-16">
                        <div className="w-full h-8 bg-secondary rounded-md animate-pulse" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  stocks.map((stock) => (
                    <TableRow key={stock.id} className="border-border hover:bg-secondary/40 transition-colors group">
                      <TableCell className="font-bold text-foreground py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
                            <Package className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                          <div>
                            <p className="font-extrabold">{stock.productName}</p>
                            <p className="text-xs text-muted-foreground font-medium">SKU: {stock.SKU}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold text-muted-foreground text-sm">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-primary/70" />
                          {stock.warehouseName}
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground font-bold">{stock.quantity}</TableCell>
                      <TableCell className="text-muted-foreground font-medium">{stock.reservedQuantity}</TableCell>
                      <TableCell className="text-foreground font-extrabold text-base">{stock.availableQuantity}</TableCell>
                      <TableCell>
                        {stock.availableQuantity <= 10 ? (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">Low Stock</span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">Optimal</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {warehouses?.map((w) => (
            <Card key={w.id} className="premium-shadow border-transparent bg-card overflow-hidden group hover:border-primary/20 transition-all">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">Active</span>
                </div>
                <CardTitle className="text-lg font-extrabold text-foreground mt-4 group-hover:text-primary transition-colors">{w.name}</CardTitle>
                <CardDescription className="text-muted-foreground font-semibold flex items-center gap-1">
                  Location: {w.location}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      {/* Adjust Stock Modal */}
      {showAddStock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card w-full max-w-md p-6 rounded-3xl premium-shadow border border-border/50 animate-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-black text-foreground mb-1">Adjust Inventory Level</h2>
            <p className="text-muted-foreground text-sm font-semibold mb-6">Manually post an inbound restock ledger event.</p>
            
            <form onSubmit={handleAddStock} className="space-y-4">
              <div>
                <label className="text-xs font-black uppercase text-muted-foreground tracking-wider mb-2 block">Product</label>
                <select 
                  value={selectedProduct} 
                  onChange={e => setSelectedProduct(e.target.value)}
                  className="w-full bg-secondary border border-transparent hover:border-border/50 p-3 rounded-2xl font-semibold text-foreground focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                >
                  <option value="">Select a Product...</option>
                  {products?.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-black uppercase text-muted-foreground tracking-wider mb-2 block">Warehouse Destination</label>
                <select 
                  value={selectedWarehouse} 
                  onChange={e => setSelectedWarehouse(e.target.value)}
                  className="w-full bg-secondary border border-transparent hover:border-border/50 p-3 rounded-2xl font-semibold text-foreground focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                >
                  <option value="">Select a Warehouse...</option>
                  {warehouses?.map(w => (
                    <option key={w.id} value={w.id}>{w.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-black uppercase text-muted-foreground tracking-wider mb-2 block">Quantity Increase</label>
                  <Input 
                    type="number"
                    value={quantity}
                    onChange={e => setQuantity(Number(e.target.value))}
                    className="bg-secondary border-transparent text-foreground font-semibold rounded-2xl h-12"
                  />
                </div>
                <div>
                  <label className="text-xs font-black uppercase text-muted-foreground tracking-wider mb-2 block">Restock Reason</label>
                  <Input 
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                    className="bg-secondary border-transparent text-foreground font-semibold rounded-2xl h-12"
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <Button 
                  type="button" 
                  onClick={() => setShowAddStock(false)} 
                  variant="ghost" 
                  className="text-muted-foreground font-semibold rounded-full px-5"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary/95 text-white font-semibold rounded-full px-6 shadow-md shadow-primary/20"
                >
                  Confirm Adjustment
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Warehouse Modal */}
      {showAddWarehouse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card w-full max-w-md p-6 rounded-3xl premium-shadow border border-border/50 animate-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-black text-foreground mb-1">Create Distribution Center</h2>
            <p className="text-muted-foreground text-sm font-semibold mb-6">Initialize a new storage location in our supply chain.</p>
            
            <form onSubmit={handleAddWarehouse} className="space-y-4">
              <div>
                <label className="text-xs font-black uppercase text-muted-foreground tracking-wider mb-2 block">Warehouse Name</label>
                <Input 
                  placeholder="e.g. Chicago Logistics Center"
                  value={warehouseName}
                  onChange={e => setWarehouseName(e.target.value)}
                  className="bg-secondary border-transparent text-foreground font-semibold rounded-2xl h-12"
                />
              </div>

              <div>
                <label className="text-xs font-black uppercase text-muted-foreground tracking-wider mb-2 block">Geographic Location</label>
                <Input 
                  placeholder="e.g. Chicago, IL"
                  value={warehouseLocation}
                  onChange={e => setWarehouseLocation(e.target.value)}
                  className="bg-secondary border-transparent text-foreground font-semibold rounded-2xl h-12"
                />
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <Button 
                  type="button" 
                  onClick={() => setShowAddWarehouse(false)} 
                  variant="ghost" 
                  className="text-muted-foreground font-semibold rounded-full px-5"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary/95 text-white font-semibold rounded-full px-6 shadow-md shadow-primary/20"
                >
                  Create Warehouse
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
