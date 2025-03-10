import {
  Bell,
  HelpCircle,
  Search,
  Settings,
  LogOut,
  User,
  CreditCard,
  Building,
  ChevronDown,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
};

const notifications: Notification[] = [
  {
    id: "1",
    title: "New Order",
    message: "You have received a new order #1234",
    time: "5m ago",
    read: false,
  },
  {
    id: "2",
    title: "Payment Success",
    message: "Payment for order #1233 was successful",
    time: "1h ago",
    read: false,
  },
];

export const TopBar = () => {
  return (
    <header className="border-b border-polaris-border h-16 flex items-center px-4 bg-white">
      <div className="flex items-center gap-3 mr-6">
        <SidebarTrigger className="-ml-1" />
        <span className="font-semibold text-polaris-dark">XpressOrder</span>
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
        <Popover>
          <PopoverTrigger asChild>
            <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted transition-colors relative">
              <Bell className="h-5 w-5 text-gray-500" />
              {notifications.some((n) => !n.read) && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="flex flex-col">
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <h2 className="font-semibold">Notifications</h2>
                <button className="text-sm text-muted-foreground hover:text-primary">
                  Mark all as read
                </button>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center text-muted-foreground">
                    No notifications
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start gap-4 p-4 hover:bg-muted transition-colors cursor-pointer ${
                        !notification.read ? "bg-muted/50" : ""
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">
                          {notification.title}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {notification.time}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                      )}
                    </div>
                  ))
                )}
              </div>
              {notifications.length > 0 && (
                <div className="p-4 border-t">
                  <button className="w-full text-center text-sm text-muted-foreground hover:text-primary">
                    View all notifications
                  </button>
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>

        <Separator orientation="vertical" className="h-4" />

        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-2 hover:bg-muted p-1 rounded-full transition-colors">
              <Avatar className="h-9 w-9 border border-polaris-border">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="Profile"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-0" align="end">
            <div className="flex flex-col">
              <div className="flex items-center gap-3 p-4 border-b">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="Profile"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">
                    john@example.com
                  </p>
                </div>
              </div>

              <div className="p-2">
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors">
                  <User className="h-4 w-4" />
                  Profile
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors">
                  <Building className="h-4 w-4" />
                  Organization
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors">
                  <CreditCard className="h-4 w-4" />
                  Billing
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors">
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
              </div>

              <div className="border-t p-2">
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors text-red-500 hover:text-red-600">
                  <LogOut className="h-4 w-4" />
                  Log out
                </button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};
