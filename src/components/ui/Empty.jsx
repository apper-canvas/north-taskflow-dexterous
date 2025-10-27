import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No tasks yet", 
  description = "Get started by adding your first task", 
  actionText = "Add Task",
  onAction 
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6">
      <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="CheckSquare" size={48} className="text-primary-600" />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md text-lg">
        {description}
      </p>
      
      {onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <ApperIcon name="Plus" size={20} className="mr-2" />
          {actionText}
        </button>
      )}
    </div>
  );
};

export default Empty;