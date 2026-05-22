"use client";

import React, { useState } from "react";
import { CreateOrderItemCommand } from "@flowcart/types";
import { orderApi } from "@flowcart/api-sdk";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function CreateOrderForm() {
  const [shippingAddress, setShippingAddress] = useState("");
  const [items, setItems] = useState<CreateOrderItemCommand[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Temporary Form States
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [unitPrice, setUnitPrice] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number | "">(1);

  const addItem = () => {
    if (!productId || !productName || unitPrice === "" || unitPrice <= 0 || quantity === "" || quantity <= 0) return;
    setItems([...items, { productId, productName, unitPrice, quantity }]);
    setProductId("");
    setProductName("");
    setUnitPrice("");
    setQuantity(1);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setIsSubmitting(true);
    try {
      // Hardcoded userId for demo purposes. Real app uses authenticated user context.
      const userId = "c1234567-89ab-cdef-0123-456789abcdef"; 
      await orderApi.createOrder({
        userId,
        shippingAddress,
        items
      });
      setSuccess(true);
      setItems([]);
      setShippingAddress("");
    } catch (error) {
      console.error("Failed to create order", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <Card className="w-full max-w-2xl mx-auto shadow-2xl shadow-blue-500/10 border-blue-100 bg-white/80 backdrop-blur-xl">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
          <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-green-400 to-emerald-600 flex items-center justify-center mb-6 shadow-xl shadow-green-500/20 transform hover:scale-110 transition-transform duration-500">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Order Placed!</h2>
          <p className="text-slate-500 mt-2">Your order has been successfully created and sent to the processing queue.</p>
          <Button onClick={() => setSuccess(false)} className="mt-8 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 transition-all rounded-full px-8 py-6">
            Create Another Order
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white/60 backdrop-blur-2xl border-white/40 shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500"></div>
      
      <CardHeader className="pb-8 pt-10">
        <CardTitle className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-600 tracking-tighter">
          Create New Order
        </CardTitle>
        <CardDescription className="text-slate-500 text-lg">
          Fill in the shipping details and add items to the cart.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-2">Shipping Information</h3>
            <div className="space-y-2 group relative">
              <Label className="text-slate-600 font-semibold group-focus-within:text-blue-600 transition-colors">Shipping Address</Label>
              <Input 
                value={shippingAddress} 
                onChange={e => setShippingAddress(e.target.value)} 
                placeholder="123 Main St, City, Country"
                required
                className="border-slate-200 focus-visible:ring-blue-500/50 focus-visible:border-blue-500 bg-white/50 backdrop-blur-sm transition-all duration-300 shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-2 flex items-center justify-between">
              Order Items
              <span className="text-sm font-normal text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{items.length} items</span>
            </h3>
            
            {/* Add Item Form */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-slate-50/50 p-6 rounded-2xl border border-slate-100/50 shadow-inner">
              <div className="md:col-span-3 space-y-2">
                <Label className="text-xs uppercase tracking-wider font-bold text-slate-500">Product ID</Label>
                <Input value={productId} onChange={e => setProductId(e.target.value)} placeholder="UUID" className="bg-white border-slate-200" />
              </div>
              <div className="md:col-span-4 space-y-2">
                <Label className="text-xs uppercase tracking-wider font-bold text-slate-500">Product Name</Label>
                <Input value={productName} onChange={e => setProductName(e.target.value)} placeholder="Item name" className="bg-white border-slate-200" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label className="text-xs uppercase tracking-wider font-bold text-slate-500">Unit Price</Label>
                <Input type="number" min="0.01" step="0.01" value={unitPrice} onChange={e => setUnitPrice(parseFloat(e.target.value))} placeholder="0.00" className="bg-white border-slate-200" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label className="text-xs uppercase tracking-wider font-bold text-slate-500">Qty</Label>
                <Input type="number" min="1" value={quantity} onChange={e => setQuantity(parseInt(e.target.value))} className="bg-white border-slate-200" />
              </div>
              <div className="md:col-span-1">
                <Button type="button" onClick={addItem} className="w-full bg-slate-900 hover:bg-slate-800 text-white shadow-md">
                  Add
                </Button>
              </div>
            </div>

            {/* Item List */}
            {items.length > 0 ? (
              <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50/80 backdrop-blur-md text-slate-500 font-semibold border-b border-slate-100">
                    <tr>
                      <th className="p-4">Product Name</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Qty</th>
                      <th className="p-4 text-right">Total</th>
                      <th className="p-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {items.map((item, idx) => (
                      <tr key={idx} className="group hover:bg-blue-50/30 transition-colors">
                        <td className="p-4 font-medium text-slate-800">{item.productName}</td>
                        <td className="p-4 text-slate-600">${item.unitPrice.toFixed(2)}</td>
                        <td className="p-4 text-slate-600">{item.quantity}</td>
                        <td className="p-4 text-right font-bold text-slate-900">${(item.unitPrice * item.quantity).toFixed(2)}</td>
                        <td className="p-4 text-right">
                          <button type="button" onClick={() => removeItem(idx)} className="text-rose-400 hover:text-rose-600 p-2 opacity-0 group-hover:opacity-100 transition-opacity rounded-full hover:bg-rose-50">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center p-12 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                <p className="text-slate-400 font-medium">No items added to the order yet.</p>
              </div>
            )}
            
            {items.length > 0 && (
              <div className="flex justify-end p-4 rounded-xl bg-slate-50 text-slate-800">
                <span className="text-lg font-medium mr-4">Total Amount:</span>
                <span className="text-2xl font-black text-blue-600">${items.reduce((acc, curr) => acc + (curr.unitPrice * curr.quantity), 0).toFixed(2)}</span>
              </div>
            )}
          </div>
          
          <Button 
            type="submit" 
            disabled={items.length === 0 || isSubmitting}
            className="w-full py-8 text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl shadow-xl shadow-blue-500/25 transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Processing Order...
              </div>
            ) : (
              "Submit Order"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
