import { cn } from "@/lib/utils";
import {
  BellIcon,
  CircleCheckIcon,
  CircleXIcon,
  InfoIcon,
  TriangleAlertIcon,
} from "lucide-react";

interface AlertWrapProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  variant?: "default" | "info" | "success" | "warning" | "destructive";
  title?: React.ReactNode;
  icon?: React.ReactNode;
}

const variantStyles = {
  default:
    "bg-card text-white [&_[data-slot=alert-description]]:text-white [&>svg]:text-current",
  info: "bg-[#0c1b3a] text-blue-500 [&_[data-slot=alert-description]]:text-blue-500 [&>svg]:text-current",
  success:
    "bg-[#082019] text-emerald-500 [&_[data-slot=alert-description]]:text-emerald-500 [&>svg]:text-current",
  warning:
    "bg-[#3b2d08] text-amber-400 [&_[data-slot=alert-description]]:text-amber-400 [&>svg]:text-current",
  destructive:
    "bg-[#370815] text-rose-600 [&_[data-slot=alert-description]]:text-rose-600 [&>svg]:text-current",
};

const variantIcons = {
  default: BellIcon,
  info: InfoIcon,
  success: CircleCheckIcon,
  warning: TriangleAlertIcon,
  destructive: CircleXIcon,
};

export function AlertWrap({
  className,
  variant = "default",
  title,
  icon,
  children,
  ...props
}: AlertWrapProps) {
  const Icon = variantIcons[variant];

  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(
        "relative grid w-full grid-cols-[calc(var(--spacing)*4)_1fr] items-start gap-x-3 gap-y-0.5 rounded-lg border-none px-4 py-3 text-sm [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {icon ?? <Icon />}
      {title && (
        <div
          data-slot="alert-title"
          className="col-start-2 min-h-4 line-clamp-1 font-bold uppercase tracking-tight"
        >
          {title}
        </div>
      )}
      {children && (
        <div
          data-slot="alert-description"
          className="col-start-2 grid justify-items-start gap-1 text-sm text-muted-foreground [&_p]:leading-relaxed"
        >
          {children}
        </div>
      )}
    </div>
  );
}
