// src/pages/Clients.jsx
import React, { useState, useMemo } from "react";
import {
  ClientList,
  ClientDetails,
  AddClientButton,
} from "../components/ClientList";
import ClientForm from "../components/ClientForm";
import SearchBar from "../components/SearchBar";

const Clients = () => {
  // États
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "Entreprise ABC",
      email: "contact@abc.com",
      phone: "01 23 45 67 89",
      address: "123 Rue de Paris",
      totalInvoices: 5,
      totalAmount: "12,450",
      notes: "Client fidèle depuis 2020",
    },
    {
      id: 2,
      name: "Société XYZ",
      email: "contact@xyz.com",
      phone: "01 98 76 54 32",
      address: "456 Avenue des Clients",
      totalInvoices: 3,
      totalAmount: "8,720",
      notes: "Nouveau client",
    },
  ]);

  const [selectedClient, setSelectedClient] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingClient, setEditingClient] = useState(null);

  // Filtrer les clients en fonction de la recherche
  const filteredClients = useMemo(() => {
    return clients.filter(
      (client) =>
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.phone.includes(searchQuery)
    );
  }, [clients, searchQuery]);

  // Gestionnaires d'événements
  const handleAddClient = () => {
    setEditingClient(null);
    setIsFormOpen(true);
  };

  const handleEditClient = (client) => {
    setEditingClient(client);
    setIsFormOpen(true);
  };

  const handleSubmitClient = (clientData) => {
    if (editingClient) {
      // Modification d'un client existant
      setClients(
        clients.map((c) =>
          c.id === editingClient.id ? { ...clientData, id: c.id } : c
        )
      );
    } else {
      // Ajout d'un nouveau client
      const newClient = {
        ...clientData,
        id: clients.length + 1,
        totalInvoices: 0,
        totalAmount: "0",
      };
      setClients([...clients, newClient]);
    }
    setIsFormOpen(false);
    setEditingClient(null);
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-2xl font-semibold text-gray-900">Clients</h1>
        <AddClientButton onClick={handleAddClient} />
      </div>

      {/* Barre de recherche */}
      <div className="max-w-md">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Liste des clients */}
        <ClientList
          clients={filteredClients}
          onSelectClient={setSelectedClient}
        />

        {/* Détails du client */}
        <div className="lg:sticky lg:top-6">
          {selectedClient && (
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium">Détails du client</h2>
                <button
                  onClick={() => handleEditClient(selectedClient)}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  Modifier
                </button>
              </div>
              <ClientDetails client={selectedClient} />
            </div>
          )}
        </div>
      </div>

      {/* Formulaire modal */}
      {isFormOpen && (
        <ClientForm
          client={editingClient}
          onSubmit={handleSubmitClient}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};

export default Clients;
