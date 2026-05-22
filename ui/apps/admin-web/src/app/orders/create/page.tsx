import React from "react";
import { CreateOrderForm } from "@/components/orders/CreateOrderForm";

export default function CreateOrderPage() {
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col justify-center py-16">
      {/* Decorative Background Elements (Light Mode) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-400/20 blur-[120px]"></div>
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-purple-400/20 blur-[120px]"></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[40%] rounded-full bg-indigo-400/20 blur-[120px]"></div>
      </div>
      
      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-4">
            Order <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Management</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            Seamlessly create, process, and track your business orders directly through the global fulfillment network.
          </p>
        </div>
        
        <CreateOrderForm />
      </div>
    </div>
  );
}
