import axios from "axios";
import { Product, CreateProductRequest, Warehouse, CreateWarehouseRequest, Stock, AddStockRequest } from "@flowcart/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"; // Our Gateway URL

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add JWT to every request
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("auth-storage");
    if (token) {
      const parsed = JSON.parse(token);
      if (parsed.state?.token) {
        config.headers.Authorization = `Bearer ${parsed.state.token}`;
      }
    }
  }
  return config;
});

// --- Catalog Service ---
export const catalogApi = {
  getProducts: async () => {
    const { data } = await apiClient.get<Product[]>("/catalog/products");
    return data;
  },
  getProduct: async (id: string) => {
    const { data } = await apiClient.get<Product>(`/catalog/products/${id}`);
    return data;
  },
  createProduct: async (product: CreateProductRequest) => {
    const { data } = await apiClient.post<Product>("/catalog/products", product);
    return data;
  },
};

// --- Inventory Service ---
export const inventoryApi = {
  getWarehouses: async () => {
    const { data } = await apiClient.get<Warehouse[]>("/inventory/warehouse");
    return data;
  },
  createWarehouse: async (warehouse: CreateWarehouseRequest) => {
    const { data } = await apiClient.post<string>("/inventory/warehouse", warehouse);
    return data;
  },
  getStockByProduct: async (productId: string) => {
    const { data } = await apiClient.get<Stock[]>(`/inventory/stock/product/${productId}`);
    return data;
  },
  addStock: async (request: AddStockRequest) => {
    const { data } = await apiClient.post<string>("/inventory/stock/add", request);
    return data;
  },
};
