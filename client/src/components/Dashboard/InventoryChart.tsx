import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer 
  } from "recharts";
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
  
  // Sample data for demonstration
  const INVENTORY_DATA = [
    { name: "iPhone 13", inStock: 32, lowStock: 5, outOfStock: 0 },
    { name: "AirPods", inStock: 18, lowStock: 2, outOfStock: 0 },
    { name: "MacBook Pro", inStock: 12, lowStock: 3, outOfStock: 0 },
    { name: "iPad Pro", inStock: 8, lowStock: 4, outOfStock: 1 },
    { name: "iMac", inStock: 5, lowStock: 2, outOfStock: 2 },
    { name: "Apple Watch", inStock: 20, lowStock: 0, outOfStock: 0 },
  ];
  
  const DAILY_DATA = [
    { name: "Jul 16", sales: 18 },
    { name: "Jul 17", sales: 24 },
    { name: "Jul 18", sales: 32 },
    { name: "Jul 19", sales: 45 },
    { name: "Jul 20", sales: 39 },
    { name: "Jul 21", sales: 28 },
    { name: "Jul 22", sales: 35 },
  ];
  
  const WEEKLY_DATA = [
    { name: "Week 1", sales: 120 },
    { name: "Week 2", sales: 145 },
    { name: "Week 3", sales: 132 },
    { name: "Week 4", sales: 178 },
  ];
  
  const InventoryChart = () => {
    return (
      <Card className="bg-white">
        <CardHeader>
          <Tabs defaultValue="inventory" className="w-full">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Analytics</CardTitle>
              <TabsList>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                <TabsTrigger value="daily">Daily Sales</TabsTrigger>
                <TabsTrigger value="weekly">Weekly Sales</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="inventory" className="animate-fade-in ">
              <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={INVENTORY_DATA}
                    margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                    barGap={8}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip 
                      cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                      contentStyle={{ borderRadius: 4, boxShadow: "0 2px 8px rgba(0,0,0,0.1)", borderColor: "#dfe3e8" }}
                    />
                    <Bar dataKey="inStock" fill="#5c6ac4" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="lowStock" fill="#b3bcf5" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="outOfStock" fill="#ff5252" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="daily" className="animate-fade-in ">
              <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={DAILY_DATA}
                    margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip 
                      cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                      contentStyle={{ borderRadius: 4, boxShadow: "0 2px 8px rgba(0,0,0,0.1)", borderColor: "#dfe3e8" }}
                    />
                    <Bar dataKey="sales" fill="#5c6ac4" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="weekly" className="animate-fade-in ">
              <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={WEEKLY_DATA}
                    margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip 
                      cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                      contentStyle={{ borderRadius: 4, boxShadow: "0 2px 8px rgba(0,0,0,0.1)", borderColor: "#dfe3e8" }}
                    />
                    <Bar dataKey="sales" fill="#5c6ac4" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardHeader>
        <CardContent>
        </CardContent>
      </Card>
    );
  };
  
  export default InventoryChart;