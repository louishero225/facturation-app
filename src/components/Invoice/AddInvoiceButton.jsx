// src/components/Invoice/AddInvoiceButton.jsx
import { PlusIcon } from "@heroicons/react/24/outline";

const AddInvoiceButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <PlusIcon className="h-5 w-5 mr-2" />
      Nouvelle facture
    </button>
  );
};

export default AddInvoiceButton;
