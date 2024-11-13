// src/components/NotificationCard.jsx
import React from "react";

const NotificationCard = ({ notification }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-2">
      <div className="flex items-center">
        <div className="flex-1">
          <p className="text-sm text-gray-900">{notification.message}</p>
          <p className="text-xs text-gray-500">{notification.time}</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
