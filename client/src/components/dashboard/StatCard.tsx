import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statCardVariants = cva(
  "rounded-lg p-5 bg-white border flex flex-col",
  {
    variants: {
      variant: {
        default: "hover:border-2 hover:border-indigo-500/50",
        outline: "border border-indigo-500 shadow-none hover:border-2 hover:border-indigo-500/50",
        primary: "bg-polaris text-white border-none hover:border-2 hover:border-white/20",
      },
      size: {
        default: "",
        sm: "p-4",
        lg: "p-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface StatCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statCardVariants> {
  title: string;
  value: string | number;
  change?: {
    value: number;
    positive?: boolean;
  };
  icon?: React.ReactNode;
}

const StatCard = ({
  className,
  variant,
  size,
  title,
  value,
  change,
  icon,
  ...props
}: StatCardProps) => {
  return (
    <div
      className={cn(
        statCardVariants({ variant, size }),
        "transition-all hover:shadow-polaris-md hover:border-2 hover:border-polaris/50",
        variant === "outline" && "hover:border-white/20",
        className
      )}
      {...props}
    >
      <div className="flex justify-between items-start mb-3">
        <h3
          className={cn(
            "text-sm font-medium",
            variant === "primary" ? "text-white/80" : "text-muted-foreground"
          )}
        >
          {title}
        </h3>
        {icon && (
          <span
            className={cn(
              "rounded-full p-1.5",
              variant === "primary" ? "bg-white/10" : "bg-polaris/10"
            )}
          >
            {icon}
          </span>
        )}
      </div>
      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <p
            className={cn(
              "text-2xl font-semibold",
              "animate-in fade-in duration-700"
            )}
          >
            {value}
          </p>
          {change && (
            <div
              className={cn(
                "flex items-center text-xs mt-1",
                change.positive
                  ? variant === "primary"
                    ? "text-white/90"
                    : "text-emerald-600"
                  : variant === "primary"
                  ? "text-white/90"
                  : "text-rose-600",
                "animate-in fade-in duration-700 delay-200"
              )}
            >
              <span className="mr-1">{change.positive ? "↑" : "↓"}</span>
              <span>{Math.abs(change.value)}%</span>
              <span className="ml-1 opacity-70">vs last period</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
