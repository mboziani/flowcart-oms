"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
import { catalogApi } from "@flowcart/api-sdk";
import { CreateProductRequest } from "@flowcart/types";

import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.preprocess((val) => Number(val), z.number().min(0.01, "Price must be greater than 0")),
  category: z.string().min(1, "Please select a category"),
  imageUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

type ProductFormValues = z.infer<typeof productSchema>;

export function AddProductModal() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "General",
      imageUrl: "",
    }
  });

  const mutation = useMutation({
    mutationFn: (data: CreateProductRequest) => catalogApi.createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setOpen(false);
      reset();
    },
  });

  const onSubmit = (data: ProductFormValues) => {
    mutation.mutate(data as CreateProductRequest);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 text-white font-bold shadow-md shadow-primary/20 transition-all active:scale-95 rounded-full px-5">
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] bg-card border-border premium-shadow !rounded-2xl">
        <DialogHeader className="pb-4 border-b border-border/60">
          <DialogTitle className="text-xl font-extrabold text-foreground">Add New Product</DialogTitle>
          <DialogDescription className="font-medium text-muted-foreground">
            Create a new entry in your product catalog. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-bold text-foreground">Product Name</Label>
              <Input
                id="name"
                placeholder="e.g. Premium Wireless Headphones"
                className="bg-secondary/50 border-border focus:ring-2 focus:ring-primary/20 transition-all h-11 text-base font-medium"
                {...register("name")}
              />
              {errors.name && <p className="text-xs text-destructive font-bold">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-sm font-bold text-foreground">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="99.99"
                  className="bg-secondary/50 border-border focus:ring-2 focus:ring-primary/20 transition-all h-11 font-bold"
                  {...register("price")}
                />
                {errors.price && <p className="text-xs text-destructive font-bold">{errors.price.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-bold text-foreground">Category</Label>
                <Input
                  id="category"
                  placeholder="Electronics"
                  className="bg-secondary/50 border-border focus:ring-2 focus:ring-primary/20 transition-all h-11 font-medium"
                  {...register("category")}
                />
                {errors.category && <p className="text-xs text-destructive font-bold">{errors.category.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-bold text-foreground">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the product features, specifications, etc."
                className="bg-secondary/50 border-border focus:ring-2 focus:ring-primary/20 transition-all min-h-[120px] resize-y font-medium text-base p-4"
                {...register("description")}
              />
              {errors.description && <p className="text-xs text-destructive font-bold">{errors.description.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl" className="text-sm font-bold text-foreground">Image URL <span className="text-muted-foreground font-normal">(Optional)</span></Label>
              <Input
                id="imageUrl"
                placeholder="https://example.com/image.jpg"
                className="bg-secondary/50 border-border focus:ring-2 focus:ring-primary/20 transition-all h-11"
                {...register("imageUrl")}
              />
              {errors.imageUrl && <p className="text-xs text-destructive font-bold">{errors.imageUrl.message}</p>}
            </div>
          </div>
          <DialogFooter className="pt-4 border-t border-border/60">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground hover:bg-secondary font-bold"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary/90 text-white font-bold shadow-md shadow-primary/20 transition-all active:scale-95 px-8"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                "Create Product"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
