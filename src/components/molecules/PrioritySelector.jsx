import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const priorities = [
  { value: "high", label: "High", color: "red", icon: "AlertTriangle" },
  { value: "medium", label: "Medium", color: "amber", icon: "Circle" },
  { value: "low", label: "Low", color: "green", icon: "Minus" }
];

const PrioritySelector = ({ 
  value, 
  onChange, 
  label = "Priority",
  className 
}) => {
  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="grid grid-cols-3 gap-2">
        {priorities.map((priority) => (
          <button
            key={priority.value}
            type="button"
            onClick={() => onChange(priority.value)}
            className={cn(
              "flex items-center justify-center space-x-2 px-3 py-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium",
              value === priority.value
                ? `border-${priority.color}-500 bg-${priority.color}-50 text-${priority.color}-700`
                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50",
              priority.value === "high" && value === priority.value && "border-red-500 bg-red-50 text-red-700",
              priority.value === "medium" && value === priority.value && "border-amber-500 bg-amber-50 text-amber-700",
              priority.value === "low" && value === priority.value && "border-green-500 bg-green-50 text-green-700"
            )}
          >
            <ApperIcon name={priority.icon} size={16} />
            <span>{priority.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PrioritySelector;