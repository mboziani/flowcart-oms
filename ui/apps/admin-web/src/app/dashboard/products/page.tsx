"use client";

import { useQuery } from "@tanstack/react-query";
import { Search, MoreHorizontal, Package, Filter } from "lucide-react";
import { catalogApi } from "@flowcart/api-sdk";
import { AddProductModal } from "@/components/products/AddProductModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import Link from "next/link";

export default function ProductsPage() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: catalogApi.getProducts,
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Products</h1>
          <p className="text-muted-foreground mt-1 font-medium">Manage your catalog and product listings.</p>
        </div>
        <AddProductModal />
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search products..." 
            className="bg-card border-transparent hover:border-border pl-10 text-foreground focus:ring-2 focus:ring-primary/20 transition-all rounded-full shadow-sm h-10"
          />
        </div>
        <Button variant="outline" className="border-border text-foreground hover:bg-secondary font-semibold rounded-full px-5 shadow-sm">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>

      <Card className="premium-shadow border-transparent bg-card overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-secondary/50">
              <TableRow className="hover:bg-transparent border-border">
                <TableHead className="text-muted-foreground font-bold uppercase text-xs tracking-wider w-[40%]">Product</TableHead>
                <TableHead className="text-muted-foreground font-bold uppercase text-xs tracking-wider">Category</TableHead>
                <TableHead className="text-muted-foreground font-bold uppercase text-xs tracking-wider">Price</TableHead>
                <TableHead className="text-muted-foreground font-bold uppercase text-xs tracking-wider">Created</TableHead>
                <TableHead className="text-right text-muted-foreground font-bold uppercase text-xs tracking-wider">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i} className="border-border">
                    <TableCell colSpan={5} className="h-16">
                        <div className="w-full h-8 bg-secondary rounded-md animate-pulse" />
                    </TableCell>
                  </TableRow>
                ))
              ) : products?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-64 text-center text-muted-foreground">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                            <Package className="w-8 h-8 text-muted-foreground/50" />
                        </div>
                        <p className="font-semibold text-lg">No products found</p>
                        <p className="text-sm">Click "Add Product" to get started.</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                products?.map((product) => (
                  <TableRow key={product.id} className="border-border hover:bg-secondary/40 transition-colors group">
                    <TableCell className="font-medium text-foreground py-4">
                      <Link href={`/dashboard/products/${product.id}`} className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                          <Package className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <div>
                          <p className="font-bold text-base group-hover:text-primary transition-colors">{product.name}</p>
                          <p className="text-xs text-muted-foreground font-medium line-clamp-1">{product.description}</p>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <span className="px-3 py-1 bg-secondary text-foreground font-semibold rounded-full text-xs">
                        {product.category}
                      </span>
                    </TableCell>
                    <TableCell className="text-foreground font-bold">
                      ${product.price.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm font-medium">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:bg-primary/10">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
