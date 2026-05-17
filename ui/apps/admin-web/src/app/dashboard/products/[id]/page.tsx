"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { catalogApi } from "@flowcart/api-sdk";
import { ArrowLeft, Save, Loader2, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";

const productSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  price: z.preprocess((val) => Number(val), z.number().min(0.01)),
  category: z.string().min(1),
  imageUrl: z.string().url().optional().or(z.literal("")),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => catalogApi.getProduct(id as string),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as any,
  });

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        imageUrl: product.imageUrl || "",
      });
    }
  }, [product, reset]);

  const updateMutation = useMutation({
    mutationFn: (data: ProductFormValues) => {
        console.log("Updating product:", data);
        return Promise.resolve(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="text-muted-foreground hover:text-foreground hover:bg-secondary font-semibold"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
        </Button>
        <div className="flex items-center gap-3">
            <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 font-semibold shadow-sm">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
            </Button>
            <Button 
                onClick={handleSubmit((data) => updateMutation.mutate(data))}
                className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-md shadow-primary/20 transition-all active:scale-95"
                disabled={!isDirty || updateMutation.isPending}
            >
                {updateMutation.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Save className="mr-2 h-4 w-4" />
                )}
                Save Changes
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-2 premium-shadow border-transparent bg-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-extrabold text-foreground">General Information</CardTitle>
            <CardDescription className="font-medium text-muted-foreground">Update the core details of your product.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-bold text-foreground">Product Name</Label>
              <Input {...register("name")} className="bg-secondary/50 border-border focus:ring-2 focus:ring-primary/20 transition-all h-11 text-base font-medium" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-bold text-foreground">Category</Label>
                <Input {...register("category")} className="bg-secondary/50 border-border focus:ring-2 focus:ring-primary/20 transition-all h-11 font-medium" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-bold text-foreground">Price ($)</Label>
                <Input type="number" step="0.01" {...register("price")} className="bg-secondary/50 border-border focus:ring-2 focus:ring-primary/20 transition-all h-11 font-bold" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-bold text-foreground">Description</Label>
              <Textarea {...register("description")} className="bg-secondary/50 border-border focus:ring-2 focus:ring-primary/20 transition-all min-h-[160px] resize-y font-medium text-base p-4" />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
            <Card className="premium-shadow border-transparent bg-card">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold text-foreground">Product Image</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                    <div className="aspect-square bg-secondary/50 rounded-xl border border-border border-dashed flex items-center justify-center overflow-hidden relative group">
                        {product?.imageUrl ? (
                            <>
                                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Button variant="secondary" size="sm" className="font-semibold shadow-md">Change Image</Button>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center gap-3 text-muted-foreground">
                                <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center shadow-sm">
                                    <Plus className="w-6 h-6 text-primary" />
                                </div>
                                <span className="text-sm font-bold">Add an image</span>
                            </div>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Image URL</Label>
                        <Input {...register("imageUrl")} placeholder="https://..." className="bg-secondary/50 border-border focus:ring-2 focus:ring-primary/20 transition-all h-10 text-sm" />
                    </div>
                </CardContent>
            </Card>

            <Card className="premium-shadow border-transparent bg-card">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold text-foreground">Status & Meta</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-border/50">
                        <span className="text-sm font-semibold text-muted-foreground">Status</span>
                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">Active</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-border/50">
                        <span className="text-sm font-semibold text-muted-foreground">Created</span>
                        <span className="text-sm font-bold text-foreground">{product ? new Date(product.createdAt).toLocaleDateString() : '-'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-muted-foreground">ID</span>
                        <span className="text-xs font-mono font-bold bg-secondary px-2 py-1 rounded text-foreground">{product?.id}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
