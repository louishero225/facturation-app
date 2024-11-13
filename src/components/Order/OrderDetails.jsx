// src/components/Order/OrderDetails.jsx
import React from "react";
import OrderStatusBadge from "./OrderStatusBadge.jsx";

const OrderDetails = ({ order, onUpdateStatus }) => {
  if (!order) return null;

  const TVA_RATE = 15.255;
  const statuses = ["en attente", "complété", "annulé"];

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {/* En-tête */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Commande #{order.number}</h2>
        <div className="flex items-center space-x-4">
          <OrderStatusBadge status={order.status} />
          <select
            value={order.status}
            onChange={(e) => onUpdateStatus(order.id, e.target.value)}
            className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Informations générales */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-500">Commercial</p>
          <p className="font-medium">{order.salesRep?.name || "Non assigné"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Date</p>
          <p className="font-medium">{formatDate(order.date)}</p>
        </div>
      </div>

      {/* Informations client */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Client</h3>
        <div className="space-y-1">
          <p className="font-medium">
            {order.client?.name || "Client non spécifié"}
          </p>
          <p className="text-sm text-gray-600">{order.client?.email}</p>
          <p className="text-sm text-gray-600">{order.client?.address}</p>
        </div>
      </div>

      {/* Liste des articles */}
      <div className="border rounded-lg mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Produit
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Prix unitaire
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Quantité
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {order.items?.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.product?.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                  {item.product?.price?.toFixed(2) || "0.00"} €
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                  {item.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                  {((item.product?.price || 0) * item.quantity).toFixed(2)} €
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totaux */}
      <div className="flex justify-end space-x-4">
        <div className="text-right">
          <p className="text-sm text-gray-500">Sous-total</p>
          <p className="text-sm text-gray-500">TVA ({TVA_RATE}%)</p>
          <p className="text-lg font-medium mt-2">Total</p>
        </div>
        <div className="text-right w-32">
          <p className="text-sm text-gray-900">
            {order.subtotal?.toFixed(2) || "0.00"} €
          </p>
          <p className="text-sm text-gray-900">
            {order.tax?.toFixed(2) || "0.00"} €
          </p>
          <p className="text-lg font-medium mt-2">
            {order.total?.toFixed(2) || "0.00"} €
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
