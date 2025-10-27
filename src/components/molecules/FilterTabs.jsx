import React from "react";
import { cn } from "@/utils/cn";
import Badge from "@/components/atoms/Badge";

const FilterTabs = ({ 
  activeFilter, 
  onFilterChange, 
  filters = [] 
}) => {
  return (
    <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={cn(
            "flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
            activeFilter === filter.value
              ? "bg-white text-primary-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          )}
        >
          <span>{filter.label}</span>
          {filter.count !== undefined && (
            <Badge 
              variant={activeFilter === filter.value ? "primary" : "default"}
              size="sm"
            >
              {filter.count}
            </Badge>
          )}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;