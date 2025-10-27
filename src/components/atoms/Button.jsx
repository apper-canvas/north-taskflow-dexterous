import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Button = forwardRef(({ 
  children, 
  variant = "primary", 
  size = "default", 
  loading = false,
  disabled = false,
  icon,
  iconPosition = "left",
  className,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 focus:ring-primary-500 shadow-lg hover:shadow-xl transform hover:scale-105",
    secondary: "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 focus:ring-primary-500 shadow-sm hover:shadow-md",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-primary-500",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-red-500 shadow-lg hover:shadow-xl transform hover:scale-105"
  };
  
  const sizes = {
    sm: "px-3 py-2 text-sm h-8",
    default: "px-4 py-2 text-sm h-10",
    lg: "px-6 py-3 text-base h-12"
  };
  
  const isDisabled = disabled || loading;
  
  return (
    <button
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        isDisabled && "transform-none hover:scale-100",
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <ApperIcon name="Loader2" size={16} className="animate-spin mr-2" />
      )}
      {icon && iconPosition === "left" && !loading && (
        <ApperIcon name={icon} size={16} className="mr-2" />
      )}
      {children}
      {icon && iconPosition === "right" && !loading && (
        <ApperIcon name={icon} size={16} className="ml-2" />
      )}
    </button>
  );
});

Button.displayName = "Button";

export default Button;