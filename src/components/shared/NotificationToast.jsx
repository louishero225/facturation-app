// src/components/shared/NotificationToast.jsx
import React, { useEffect } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const NotificationToast = ({
  message,
  type = "success",
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
    error: <XCircleIcon className="h-6 w-6 text-red-500" />,
  };

  const bgColors = {
    success: "bg-green-50",
    error: "bg-red-50",
  };

  return (
    <div
      className={`fixed top-4 right-4 ${bgColors[type]} rounded-lg p-4 shadow-lg max-w-sm w-full z-50`}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">{icons[type]}</div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-4 inline-flex text-gray-400 hover:text-gray-500"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default NotificationToast;
