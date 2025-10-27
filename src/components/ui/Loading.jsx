import React from "react";

const Loading = () => {
  return (
    <div className="space-y-4 p-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-8 bg-gray-200 rounded-lg w-48 animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
      </div>
      
      {/* Search bar skeleton */}
      <div className="h-12 bg-gray-200 rounded-lg w-full animate-pulse"></div>
      
      {/* Filter tabs skeleton */}
      <div className="flex space-x-4">
        <div className="h-10 bg-gray-200 rounded-lg w-20 animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded-lg w-24 animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded-lg w-28 animate-pulse"></div>
      </div>
      
      {/* Task cards skeleton */}
      <div className="space-y-3 mt-6">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="bg-white rounded-xl p-6 shadow-sm border animate-pulse">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="w-5 h-5 bg-gray-200 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="flex items-center space-x-4 mt-3">
                    <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              </div>
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* FAB skeleton */}
      <div className="fixed bottom-6 right-6 w-14 h-14 bg-gray-200 rounded-full animate-pulse"></div>
    </div>
  );
};

export default Loading;