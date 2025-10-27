import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "@/layouts/Root";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Layout = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r from-primary-500 to-primary-600 text-white text-xl font-bold">
                T
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                TaskFlow
              </h1>
            </div>
            <Button
              onClick={logout}
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2"
            >
              <ApperIcon name="LogOut" size={18} />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default Layout;