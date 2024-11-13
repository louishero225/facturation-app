// src/pages/Home.jsx
import React from "react";
import {
  DocumentTextIcon,
  CurrencyEuroIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import StatCard from "../components/StatCard";
import NotificationCard from "../components/NotificationCard";

const Home = () => {
  // Données de test
  const stats = [
    {
      title: "Factures en attente",
      value: "12",
      icon: DocumentTextIcon,
    },
    {
      title: "Paiements reçus",
      value: "8,450 €",
      icon: CurrencyEuroIcon,
    },
  ];

  const notifications = [
    {
      message: "Nouvelle facture créée pour Client XYZ",
      time: "Il y a 2 heures",
    },
    {
      message: "Paiement reçu de Client ABC",
      time: "Il y a 3 heures",
    },
    {
      message: "Facture en retard pour Client DEF",
      time: "Il y a 5 heures",
    },
  ];

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="border-b pb-4">
        <h1 className="text-2xl font-semibold text-gray-900">
          Tableau de bord
        </h1>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Notifications récentes */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <BellIcon className="h-5 w-5 text-blue-500 mr-2" />
          <h2 className="text-lg font-medium text-gray-900">
            Notifications récentes
          </h2>
        </div>
        <div className="space-y-3">
          {notifications.map((notification, index) => (
            <NotificationCard key={index} notification={notification} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
