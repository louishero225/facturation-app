// src/components/StatCard.jsx
import React from "react";

const StatCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center">
        {Icon && <Icon className="h-8 w-8 text-blue-500 mr-3" />}
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
