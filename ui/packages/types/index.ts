export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
}

export interface Warehouse {
  id: string;
  name: string;
  location: string;
  isActive: boolean;
}

export interface CreateWarehouseRequest {
  name: string;
  location: string;
}

export interface Stock {
  id: string;
  productId: string;
  warehouseId: string;
  quantity: number;
  reservedQuantity: number;
  availableQuantity: number;
}

export interface AddStockRequest {
  productId: string;
  warehouseId: string;
  quantity: number;
  reason: string;
}
