// src/components/Invoice/InvoiceList.jsx
const InvoiceList = ({ invoices, onSelectInvoice }) => {
  return (
    <div className="bg-white shadow-md rounded-lg">
      <div className="px-4 py-3 border-b">
        <h2 className="text-lg font-medium">Liste des factures</h2>
      </div>
      <div className="divide-y">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            onClick={() => onSelectInvoice(invoice)}
            className="p-4 hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">
                  Facture #{invoice.number}
                </p>
                <p className="text-sm text-gray-500">{invoice.client}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">{invoice.total} €</p>
                <p className="text-sm text-gray-500">{invoice.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvoiceList;
