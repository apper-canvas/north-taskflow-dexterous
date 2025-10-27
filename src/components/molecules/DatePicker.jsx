import React from "react";
import Input from "@/components/atoms/Input";
import { format } from "date-fns";

const DatePicker = ({ 
  value, 
  onChange, 
  label = "Due Date",
  placeholder = "Select date",
  ...props 
}) => {
  const handleChange = (e) => {
    const dateValue = e.target.value;
    onChange(dateValue || null);
  };
  
  const formatValue = value ? (typeof value === 'string' ? value : format(value, 'yyyy-MM-dd')) : '';
  
  return (
    <Input
      type="date"
      label={label}
      placeholder={placeholder}
      value={formatValue}
      onChange={handleChange}
      {...props}
    />
  );
};

export default DatePicker;