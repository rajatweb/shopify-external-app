import StatCard from "@/components/dashboard/StatCard";
import AppLayout from "@/components/layout/AppLayout";
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import { cn } from "@/lib/utils";
// import InventoryChart from "@/components/dashboard/InventoryChart";
// import ProductPerformance from "@/components/dashboard/ProductPerformance";
import RecentOrdersTable from "@/components/dashboard/RecentOrdersTable";

function Home() {
  return (
    <AppLayout>
      <div className="my-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
            <p className="text-sm text-muted-foreground">
              Welcome back. Here's an overview of your store.
            </p>
          </div>
          <div className="flex items-center gap-2">
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
        <div className="my-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
            className={cn("animate-fade-in")}
          />
          <StatCard
            title="Customers"
            value="1,249"
            change={{ value: 5, positive: true }}
            icon={<Users className="h-4 w-4 text-polaris" />}
            className={cn("animate-fade-in")}
          />
          <StatCard
            title="Inventory"
            value="384 items"
            change={{ value: 2, positive: false }}
            icon={<Package className="h-4 w-4 text-polaris" />}
            className={cn("animate-fade-in")}
          />
        </div>

        {/* Charts Grid */}
        {/* <div className="grid gap-4 md:grid-cols-7">
          <div className="md:col-span-4">
            <InventoryChart />
          </div>
          <div className="md:col-span-3">
            <ProductPerformance />
          </div>
        </div> */}
        
        {/* Recent Orders */}
        <RecentOrdersTable />
      </div>
    </AppLayout>
  );
}

export default Home;
