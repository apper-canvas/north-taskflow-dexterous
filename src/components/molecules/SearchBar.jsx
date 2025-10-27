import React, { useState, useEffect } from "react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const SearchBar = ({ 
  onSearch, 
  placeholder = "Search tasks...", 
  debounceMs = 300 
}) => {
  const [query, setQuery] = useState("");
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, debounceMs);
    
    return () => clearTimeout(timer);
  }, [query, onSearch, debounceMs]);
  
  const handleClear = () => {
    setQuery("");
  };
  
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <ApperIcon name="Search" size={20} className="text-gray-400" />
      </div>
      
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10 pr-10"
      />
      
      {query && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="h-6 w-6 p-0 hover:bg-gray-200 rounded-full"
          >
            <ApperIcon name="X" size={16} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;