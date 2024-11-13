// src/pages/Invoices.jsx
import React, { useState } from "react";
import {
  InvoiceList,
  InvoiceDetails,
  AddInvoiceButton,
} from "../components/Invoice";
import SearchBar from "../components/SearchBar";

const Invoices = () => {
  // Données de test
  const [invoices] = useState([
    {
      id: 1,
      number: "FACT-2024-001",
      client: "Entreprise ABC",
      date: "2024-01-15",
      status: "payée",
      total: 1250.0,
      subtotal: 1041.67,
      tax: 208.33,
      items: [
        {
          description: "Développement site web",
          quantity: 5,
          unitPrice: 200.0,
        },
        {
          description: "Hébergement annuel",
          quantity: 1,
          unitPrice: 250.0,
        },
      ],
    },
    {
      id: 2,
      number: "FACT-2024-002",
      client: "Société XYZ",
      date: "2024-01-20",
      status: "en attente",
      total: 800.0,
      subtotal: 666.67,
      tax: 133.33,
      items: [
        {
          description: "Maintenance mensuelle",
          quantity: 1,
          unitPrice: 800.0,
        },
      ],
    },
  ]);

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filtrer les factures
  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddInvoice = () => {
    // Sera implémenté plus tard
    alert("Création d'une nouvelle facture - À implémenter");
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-2xl font-semibold text-gray-900">Factures</h1>
        <AddInvoiceButton onClick={handleAddInvoice} />
      </div>

      {/* Barre de recherche */}
      <div className="max-w-md">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Liste des factures */}
        <InvoiceList
          invoices={filteredInvoices}
          onSelectInvoice={setSelectedInvoice}
        />

        {/* Détails de la facture */}
        <div className="lg:sticky lg:top-6">
          <InvoiceDetails invoice={selectedInvoice} />
        </div>
      </div>
    </div>
  );
};

export default Invoices;
