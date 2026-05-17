"use client";

import { Bell, Search, UserCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/store/useAuth";
import { useRouter } from "next/navigation";

export function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-xl px-8 flex items-center justify-between sticky top-0 z-10 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search orders, products, customers..." 
            className="w-full bg-secondary/50 border-transparent hover:border-border pl-10 text-foreground focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all rounded-full h-10"
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-card" />
        </Button>
        
        <div className="h-8 w-[1px] bg-border mx-1" />

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-foreground leading-none">{user?.email?.split('@')[0] || "Admin User"}</p>
            <p className="text-xs font-semibold text-muted-foreground capitalize mt-1">{user?.role || "Manager"}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold">
            {user?.email?.charAt(0).toUpperCase() || 'A'}
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full ml-1" onClick={handleLogout}>
            <LogOut size={18} />
          </Button>
        </div>
      </div>
    </header>
  );
}
