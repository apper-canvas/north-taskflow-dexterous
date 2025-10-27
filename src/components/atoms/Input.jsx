import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  type = "text",
  label,
  error,
  className,
  ...props 
}, ref) => {
  const inputStyles = cn(
    "w-full px-3 py-3 text-base border border-gray-200 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white placeholder-gray-400",
    error && "border-red-300 focus:ring-red-500",
    className
  );
  
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={inputStyles}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;