import { Bell, HelpCircle, Search, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SidebarTrigger } from "../ui/sidebar";

const TopBar = () => {
  return (
    <header className="border-b border-polaris-border h-16 flex items-center px-4 bg-white">
      <div className="flex items-center gap-3 mr-6">
        <SidebarTrigger className="-ml-1" />
        
        <span className="font-semibold text-polaris-dark">Polaris</span>
      </div>

      <div className="relative max-w-md flex-1 mx-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search..."
          className={cn(
            "pl-9 h-9 bg-secondary border-0 focus-visible:ring-1 transition-all",
            "placeholder:text-muted-foreground/70",
            "w-full max-w-md"
          )}
        />
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted transition-colors">
          <HelpCircle className="h-5 w-5 text-gray-500" />
        </button>
        <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted transition-colors relative">
          <Bell className="h-5 w-5 text-gray-500" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted transition-colors">
          <Settings className="h-5 w-5 text-gray-500" />
        </button>

        <div className="h-8 w-px bg-polaris-border mx-1"></div>

        <Avatar className="h-9 w-9 border border-polaris-border">
          <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default TopBar;
