// src/components/Invoice/InvoiceDetails.jsx
import InvoiceStatusBadge from "./InvoiceStatusBadge";

const InvoiceDetails = ({ invoice }) => {
  if (!invoice) return null;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Facture #{invoice.number}</h2>
        <InvoiceStatusBadge status={invoice.status} />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-500">Client</p>
          <p className="font-medium">{invoice.client}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Date</p>
          <p className="font-medium">{invoice.date}</p>
        </div>
      </div>

      <div className="border rounded-lg mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Description
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Quantité
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Prix unitaire
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoice.items.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                  {item.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                  {item.unitPrice} €
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                  {item.quantity * item.unitPrice} €
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end space-x-4">
        <div className="text-right">
          <p className="text-sm text-gray-500">Sous-total</p>
          <p className="text-sm text-gray-500">TVA (20%)</p>
          <p className="text-lg font-medium mt-2">Total</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-900">{invoice.subtotal} €</p>
          <p className="text-sm text-gray-900">{invoice.tax} €</p>
          <p className="text-lg font-medium mt-2">{invoice.total} €</p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
