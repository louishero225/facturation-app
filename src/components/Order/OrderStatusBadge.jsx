// src/components/Order/OrderStatusBadge.jsx
import React from "react";

const OrderStatusBadge = ({ status }) => {
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "complété":
        return "bg-green-100 text-green-800";
      case "en attente":
        return "bg-yellow-100 text-yellow-800";
      case "annulé":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(
        status
      )}`}
    >
      {status}
    </span>
  );
};

export default OrderStatusBadge;
