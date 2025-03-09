import { AppSidebar } from "@/components/AppLayout/Sidebar";

import {
  SidebarInset,
  SidebarProvider,
  // SidebarTrigger,
} from "@/components/ui/sidebar";
import TopBar from "@/components/AppLayout/TopBar";
import { cn } from "@/lib/utils";
import StatCard from "@/components/Dashboard/StatCard";
import { Package, ShoppingCart, Users } from "lucide-react";
import { DollarSign } from "lucide-react";
import InventoryChart from "@/components/Dashboard/InventoryChart";
import ProductPerformance from "@/components/Dashboard/ProductPerformance";
import RecentOrdersTable from "@/components/Dashboard/RecentOrdersTable";

export default function Home() {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <TopBar />
        {/* <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header> */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight animate-fade-in ">
                  Dashboard
                </h2>
                <p className="text-sm text-muted-foreground animate-fade-in  animation-delay-100">
                  Welcome back. Here's an overview of your store.
                </p>
              </div>
              <div className="flex items-center gap-2 animate-fade-in  animation-delay-200">
                <select className="h-9 rounded-md border border-input px-3 py-1 text-sm bg-white shadow-polaris-sm focus:outline-none focus:ring-1 focus:ring-ring">
                  <option value="today">Last 7 days</option>
                  <option value="yesterday">Last 30 days</option>
                  <option value="week">This month</option>
                  <option value="month">Last 3 months</option>
                  <option value="year">This year</option>
                </select>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Revenue"
                value="$24,456.00"
                change={{ value: 12, positive: true }}
                icon={<DollarSign className="h-4 w-4 text-polaris" />}
                className={cn("animate-fade-in")}
              />
              <StatCard
                title="Orders"
                value="342"
                change={{ value: 8, positive: true }}
                icon={<ShoppingCart className="h-4 w-4 text-polaris" />}
                className={cn("animate-fade-in  animation-delay-100")}
              />
              <StatCard
                title="Customers"
                value="1,249"
                change={{ value: 5, positive: true }}
                icon={<Users className="h-4 w-4 text-polaris" />}
                className={cn("animate-fade-in  animation-delay-200")}
              />
              <StatCard
                title="Inventory"
                value="384 items"
                change={{ value: 2, positive: false }}
                icon={<Package className="h-4 w-4 text-polaris" />}
                className={cn("animate-fade-in  animation-delay-300")}
              />
            </div>

            {/* Charts Grid */}
            <div className="grid gap-4 md:grid-cols-7">
              <div className="md:col-span-4">
                <InventoryChart />
              </div>
              <div className="md:col-span-3">
                <ProductPerformance />
              </div>
            </div>

            {/* Recent Orders */}
            <RecentOrdersTable />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
