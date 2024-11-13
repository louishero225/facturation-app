// src/components/Order/OrderList.jsx
import React from "react";
import OrderStatusBadge from "./OrderStatusBadge.jsx";

const OrderList = ({ orders, onSelectOrder }) => {
  return (
    <div className="bg-white shadow-md rounded-lg">
      <div className="px-4 py-3 border-b flex justify-between items-center">
        <h2 className="text-lg font-medium">Liste des commandes</h2>
        <span className="text-sm text-gray-500">
          {orders.length} commande{orders.length > 1 ? "s" : ""}
        </span>
      </div>
      <div className="divide-y">
        {orders.map((order) => (
          <div
            key={order.id}
            onClick={() => onSelectOrder(order)}
            className="p-4 hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-900">
                  Commande #{order.number}
                </p>
                <p className="text-sm text-gray-500">{order.client?.name}</p>
                <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
                  <span>{order.date}</span>
                  <span>•</span>
                  <span>{order.salesRep?.name}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">
                  {order.total?.toFixed(2)} €
                </p>
                <div className="mt-1">
                  <OrderStatusBadge status={order.status} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
