// src/components/Order/PrintOrder.jsx
import React from "react";

const PrintOrder = ({ order }) => {
  if (!order) return null;

  return (
    <div className="print-content bg-white p-8">
      {/* En-tête */}
      <div className="mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold mb-2">BON DE LIVRAISON</h1>
        <p className="text-xl">N° {order.number}</p>
        <p className="text-gray-800">
          Date : {new Date(order.date).toLocaleDateString()}
        </p>
      </div>

      {/* Informations client et commercial */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-lg font-semibold mb-2">Client</h2>
          <div className="text-gray-600">
            <p className="font-medium">{order.client?.name}</p>
            <p>{order.client?.address}</p>
            <p>{order.client?.email}</p>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Commercial</h2>
          <p className="text-gray-600">{order.salesRep?.name}</p>
        </div>
      </div>

      {/* Table des articles */}
      <table className="w-full mb-8">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 font-semibold">Description</th>
            <th className="text-right py-2 font-semibold">Prix unitaire</th>
            <th className="text-right py-2 font-semibold">Quantité</th>
            <th className="text-right py-2 font-semibold">Total</th>
          </tr>
        </thead>
        <tbody>
          {order.items?.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="py-2">{item.product?.name}</td>
              <td className="text-right py-2">
                {item.product?.price?.toFixed(2)} €
              </td>
              <td className="text-right py-2">{item.quantity}</td>
              <td className="text-right py-2">
                {((item.product?.price || 0) * item.quantity).toFixed(2)} €
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totaux */}
      <div className="flex justify-end mb-8">
        <div className="w-64">
          <div className="flex justify-between py-2">
            <span>Sous-total :</span>
            <span>{order.subtotal?.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between py-2">
            <span>TVA (15.255%) :</span>
            <span>{order.tax?.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between py-2 font-bold border-t">
            <span>Total :</span>
            <span>{order.total?.toFixed(2)} €</span>
          </div>
        </div>
      </div>

      {/* Pied de page */}
      <div className="text-sm text-gray-500 mt-8 pt-8 border-t">
        <p>Merci de votre confiance</p>
      </div>
    </div>
  );
};

export default PrintOrder;
