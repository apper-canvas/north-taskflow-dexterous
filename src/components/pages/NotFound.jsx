import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const NotFound = () => {
  const navigate = useNavigate();
  
  const handleGoHome = () => {
    navigate("/");
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="SearchX" size={48} className="text-primary-600" />
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
        
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist. Let's get you back to your tasks.
        </p>
        
        <Button
          onClick={handleGoHome}
          icon="Home"
          className="w-full sm:w-auto"
        >
          Back to Tasks
        </Button>
      </div>
    </div>
  );
};

export default NotFound;