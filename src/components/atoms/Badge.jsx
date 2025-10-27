import React from "react";
import { cn } from "@/utils/cn";

const Badge = ({ 
  children, 
  variant = "default", 
  size = "default",
  className,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center rounded-full font-medium border";
  
  const variants = {
    default: "bg-gray-100 text-gray-800 border-gray-200",
    primary: "bg-primary-100 text-primary-800 border-primary-200",
    success: "bg-green-100 text-green-800 border-green-200",
    warning: "bg-amber-100 text-amber-800 border-amber-200",
    danger: "bg-red-100 text-red-800 border-red-200",
    high: "priority-badge-high",
    medium: "priority-badge-medium",
    low: "priority-badge-low"
  };
  
  const sizes = {
    sm: "px-2 py-1 text-xs",
    default: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base"
  };
  
  return (
    <span
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;