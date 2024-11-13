// src/components/ClientList.jsx
import React from "react";
import { UserIcon } from "@heroicons/react/24/outline";

const ClientList = ({ clients, onSelectClient }) => {
  return (
    <div className="bg-white shadow-md rounded-lg">
      <div className="px-4 py-3 border-b">
        <h2 className="text-lg font-medium">Liste des clients</h2>
      </div>
      <div className="divide-y">
        {clients.map((client) => (
          <div
            key={client.id}
            onClick={() => onSelectClient(client)}
            className="p-4 hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex items-center">
              <UserIcon className="h-8 w-8 text-gray-400 mr-3" />
              <div>
                <p className="font-medium text-gray-900">{client.name}</p>
                <p className="text-sm text-gray-500">{client.email}</p>
              </div>
              <div className="ml-auto text-sm text-gray-500">
                {client.totalInvoices} factures
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// src/components/ClientDetails.jsx
const ClientDetails = ({ client }) => {
  if (!client) return null;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-medium mb-4">Détails du client</h2>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-500">Nom</label>
          <p className="text-gray-900">{client.name}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Email</label>
          <p className="text-gray-900">{client.email}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Téléphone</label>
          <p className="text-gray-900">{client.phone}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Adresse</label>
          <p className="text-gray-900">{client.address}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">
            Total des factures
          </label>
          <p className="text-gray-900">{client.totalInvoices} factures</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">
            Montant total
          </label>
          <p className="text-gray-900">{client.totalAmount} €</p>
        </div>
      </div>
    </div>
  );
};

// src/components/AddClientButton.jsx
const AddClientButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <UserIcon className="h-5 w-5 mr-2" />
      Ajouter un client
    </button>
  );
};

export { ClientList, ClientDetails, AddClientButton };
