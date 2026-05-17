"use client";

import { useAuth } from "@/store/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, ShoppingBag, DollarSign, ArrowUpRight } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    { name: "Total Revenue", value: "$45,231.89", icon: DollarSign, trend: "+20.1%", positive: true },
    { name: "Active Orders", value: "+2350", icon: ShoppingBag, trend: "+180.1%", positive: true },
    { name: "New Customers", value: "+12,234", icon: Users, trend: "+19%", positive: true },
    { name: "Conversion Rate", value: "3.2%", icon: TrendingUp, trend: "-2%", positive: false },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
          Welcome back, <span className="text-primary">{user?.email?.split('@')[0] || 'Admin'}</span>
        </h1>
        <p className="text-muted-foreground font-medium">Here is what is happening with FlowCart today.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="premium-shadow border-transparent bg-card hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-bold text-muted-foreground">
                {stat.name}
              </CardTitle>
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-extrabold text-foreground">{stat.value}</div>
              <div className="flex items-center mt-2 text-xs font-semibold">
                <span className={`flex items-center ${stat.positive ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'} px-2 py-0.5 rounded-full`}>
                  {stat.positive && <ArrowUpRight className="w-3 h-3 mr-0.5" />}
                  {stat.trend}
                </span>
                <span className="text-muted-foreground ml-2">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 premium-shadow border-transparent bg-card min-h-[350px] flex flex-col p-6">
            <h3 className="font-bold text-lg mb-4 text-foreground">Sales Overview</h3>
            <div className="flex-1 rounded-xl bg-secondary/50 border border-border border-dashed flex items-center justify-center">
              <p className="text-muted-foreground font-semibold">Sales Chart Visualization Placeholder</p>
            </div>
        </Card>
        <Card className="col-span-3 premium-shadow border-transparent bg-card min-h-[350px] flex flex-col p-6">
            <h3 className="font-bold text-lg mb-4 text-foreground">Recent Activity</h3>
            <div className="flex-1 rounded-xl bg-secondary/50 border border-border border-dashed flex items-center justify-center">
              <p className="text-muted-foreground font-semibold">Recent Orders Feed Placeholder</p>
            </div>
        </Card>
      </div>
    </div>
  );
}
