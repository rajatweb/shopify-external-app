import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";

// Sample data for demonstration
const ORDERS = [
  {
    id: "#13429",
    customer: "Devon Lane",
    product: "iPhone 13 Pro",
    date: "Jul 20, 2023",
    amount: "$999.00",
    status: "completed"
  },
  {
    id: "#13428",
    customer: "Bessie Cooper",
    product: "MacBook Air M2",
    date: "Jul 19, 2023",
    amount: "$1,199.00",
    status: "processing"
  },
  {
    id: "#13427",
    customer: "Esther Howard",
    product: "AirPods Pro",
    date: "Jul 19, 2023",
    amount: "$249.00",
    status: "completed"
  },
  {
    id: "#13426",
    customer: "Cameron Williamson",
    product: "iPad Mini",
    date: "Jul 18, 2023",
    amount: "$499.00",
    status: "completed"
  },
  {
    id: "#13425",
    customer: "Jenny Wilson",
    product: "Apple Watch Series 7",
    date: "Jul 18, 2023",
    amount: "$399.00",
    status: "failed"
  }
];

const statusClasses = {
  completed: "bg-green-50 text-green-700 border-green-100",
  processing: "bg-blue-50 text-blue-700 border-blue-100",
  failed: "bg-red-50 text-red-700 border-red-100"
};

const RecentOrdersTable = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setActiveTab("all")}
            className={cn(
              "text-sm",
              activeTab === "all" ? "bg-secondary" : ""
            )}
          >
            All
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setActiveTab("completed")}
            className={cn(
              "text-sm",
              activeTab === "completed" ? "bg-secondary" : ""
            )}
          >
            Completed
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setActiveTab("processing")}
            className={cn(
              "text-sm",
              activeTab === "processing" ? "bg-secondary" : ""
            )}
          >
            Processing
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[100px] font-medium">Order ID</TableHead>
              <TableHead className="font-medium">Customer</TableHead>
              <TableHead className="font-medium">Product</TableHead>
              <TableHead className="font-medium">Date</TableHead>
              <TableHead className="font-medium text-right">Amount</TableHead>
              <TableHead className="font-medium text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ORDERS
              .filter(order => activeTab === "all" || order.status === activeTab)
              .map((order, index) => (
                <TableRow 
                  key={order.id}
                  className={cn(
                    "transition-all animate-fade-in ",
                    `animation-delay-${index * 100}`
                  )}
                >
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell className="text-right">{order.amount}</TableCell>
                  <TableCell className="text-right">
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "font-normal capitalize",
                        statusClasses[order.status as keyof typeof statusClasses]
                      )}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentOrdersTable;