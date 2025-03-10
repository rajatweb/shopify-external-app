import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type Product = {
  id: number;
  name: string;
  sold: number;
  total: number;
  percentage: number;
  status: "in-stock" | "low-stock" | "out-of-stock";
};

const products: Product[] = [
  {
    id: 1,
    name: "Smartphone X",
    sold: 120,
    total: 200,
    percentage: 60,
    status: "in-stock",
  },
  {
    id: 2,
    name: "Bluetooth Headphones",
    sold: 85,
    total: 100,
    percentage: 85,
    status: "low-stock",
  },
  {
    id: 3,
    name: "Smart Watch",
    sold: 75,
    total: 75,
    percentage: 100,
    status: "out-of-stock",
  },
  {
    id: 4,
    name: "Laptop Pro",
    sold: 60,
    total: 150,
    percentage: 40,
    status: "in-stock",
  },
  {
    id: 5,
    name: "Wireless Charger",
    sold: 45,
    total: 50,
    percentage: 90,
    status: "low-stock",
  },
];

const getStatusColor = (status: Product["status"]) => {
  switch (status) {
    case "in-stock":
      return "text-green-600";
    case "low-stock":
      return "text-yellow-600";
    case "out-of-stock":
      return "text-red-600";
    default:
      return "";
  }
};

const ProductPerformance = () => {
  return (
    <Card className="col-span-2 row-span-2 shadow-polaris">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Top Selling Products</CardTitle>
        <CardDescription>Product sales performance in the last 30 days.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {products.map((product) => (
            <div key={product.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{product.name}</span>
                <span className={cn("text-xs font-medium", getStatusColor(product.status))}>
                  {product.status === "in-stock"
                    ? "In Stock"
                    : product.status === "low-stock"
                    ? "Low Stock"
                    : "Out of Stock"}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {product.sold} / {product.total} units
                </span>
                <span>{product.percentage}%</span>
              </div>
              <Progress 
                value={product.percentage} 
                className={cn(
                  "h-2",
                  product.status === "out-of-stock" 
                    ? "bg-gray-100" 
                    : "bg-gray-100"
                )}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductPerformance;