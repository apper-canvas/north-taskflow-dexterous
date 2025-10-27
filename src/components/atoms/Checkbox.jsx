import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = forwardRef(({ 
  checked = false,
  onChange,
  disabled = false,
  className,
  size = "default",
  ...props 
}, ref) => {
  const sizes = {
    sm: "w-4 h-4",
    default: "w-5 h-5",
    lg: "w-6 h-6"
  };
  
  const iconSizes = {
    sm: 12,
    default: 16,
    lg: 20
  };
  
  return (
    <button
      ref={ref}
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => !disabled && onChange?.(!checked)}
      disabled={disabled}
      className={cn(
        "relative inline-flex items-center justify-center rounded border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
        sizes[size],
        checked
          ? "bg-primary-500 border-primary-500 text-white transform scale-110"
          : "bg-white border-gray-300 hover:border-primary-400",
        disabled && "opacity-50 cursor-not-allowed",
        !disabled && "cursor-pointer hover:scale-105",
        className
      )}
      {...props}
    >
      {checked && (
        <ApperIcon 
          name="Check" 
          size={iconSizes[size]} 
          className="animate-scale-in" 
        />
      )}
    </button>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;