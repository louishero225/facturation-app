// src/pages/Orders.jsx
import React, { useState } from "react";
import OrderList from "../components/Order/OrderList.jsx";
import OrderDetails from "../components/Order/OrderDetails.jsx";
import OrderForm from "../components/Order/OrderForm.jsx";
import PrintOrder from "../components/Order/PrintOrder.jsx";
import AddOrderButton from "../components/Order/AddOrderButton.jsx";
import SearchBar from "../components/SearchBar.jsx";
import ConfirmationModal from "../components/shared/ConfirmationModal.jsx";
import NotificationToast from "../components/shared/NotificationToast.jsx";
import { PrinterIcon, TrashIcon } from "@heroicons/react/24/outline";
import { salesReps, clients, products } from "../data/mockData";

const Orders = () => {
  // États
  const [orders, setOrders] = useState([
    {
      id: 1,
      number: "CMD-2024-001",
      date: "2024-01-15",
      status: "en attente",
      salesRepId: 1,
      salesRep: salesReps[0],
      clientId: 1,
      client: clients[0],
      items: [
        {
          productId: 1,
          product: products[0],
          quantity: 5,
        },
        {
          productId: 2,
          product: products[1],
          quantity: 1,
        },
      ],
      subtotal: 1250.0,
      tax: 190.69,
      total: 1440.69,
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [notification, setNotification] = useState(null);

  // Fonction d'impression
  const handlePrint = () => {
    if (!selectedOrder) return;

    // Créer une nouvelle fenêtre pour l'impression
    const printWindow = window.open("", "_blank");

    // Ajouter les styles CSS et le contenu HTML
    printWindow.document.write(`
      <html>
        <head>
          <title>Commande ${selectedOrder.number}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background-color: #f8f9fa; }
            .text-right { text-align: right; }
            .mb-2 { margin-bottom: 8px; }
            .mb-8 { margin-bottom: 32px; }
            .font-bold { font-weight: bold; }
            .text-2xl { font-size: 24px; }
            .text-xl { font-size: 20px; }
            .text-gray-600 { color: #666; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
            .border-t { border-top: 1px solid #ddd; }
            .border-b { border-bottom: 1px solid #ddd; }
            .py-2 { padding-top: 8px; padding-bottom: 8px; }
          </style>
        </head>
        <body>
          <div class="print-content">
    `);

    // Ajouter le contenu HTML
    printWindow.document.write(
      document.querySelector(".print-content").innerHTML
    );
    printWindow.document.write("</div></body></html>");
    printWindow.document.close();

    // Imprimer quand le contenu est chargé
    printWindow.onload = function () {
      printWindow.print();
      printWindow.onafterprint = function () {
        printWindow.close();
      };
    };
  };

  // Filtrer les commandes
  const filteredOrders = orders.filter((order) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      order.number.toLowerCase().includes(searchLower) ||
      order.client?.name.toLowerCase().includes(searchLower) ||
      order.salesRep?.name.toLowerCase().includes(searchLower)
    );
  });

  // Gestionnaires d'événements
  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );

    if (selectedOrder?.id === orderId) {
      setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
    }

    showNotification("Statut mis à jour avec succès", "success");
  };

  const handleAddOrder = () => {
    setEditingOrder(null);
    setIsFormOpen(true);
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setIsFormOpen(true);
  };

  const handleDeleteOrder = (order) => {
    setOrderToDelete(order);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    setOrders(orders.filter((o) => o.id !== orderToDelete.id));
    if (selectedOrder?.id === orderToDelete.id) {
      setSelectedOrder(null);
    }
    setOrderToDelete(null);
    showNotification("Commande supprimée avec succès", "success");
  };

  const handleSubmitOrder = (orderData) => {
    if (editingOrder) {
      // Modification d'une commande existante
      const updatedOrder = {
        ...orderData,
        id: editingOrder.id,
        number: editingOrder.number,
        client: clients.find((c) => c.id === parseInt(orderData.clientId)),
        salesRep: salesReps.find(
          (s) => s.id === parseInt(orderData.salesRepId)
        ),
        items: orderData.items.map((item) => ({
          ...item,
          product: products.find((p) => p.id === parseInt(item.productId)),
        })),
      };

      setOrders(
        orders.map((order) =>
          order.id === editingOrder.id ? updatedOrder : order
        )
      );

      if (selectedOrder?.id === editingOrder.id) {
        setSelectedOrder(updatedOrder);
      }

      showNotification("Commande modifiée avec succès", "success");
    } else {
      // Création d'une nouvelle commande
      const newOrder = {
        ...orderData,
        id: orders.length + 1,
        number: `CMD-2024-${String(orders.length + 1).padStart(3, "0")}`,
        client: clients.find((c) => c.id === parseInt(orderData.clientId)),
        salesRep: salesReps.find(
          (s) => s.id === parseInt(orderData.salesRepId)
        ),
        items: orderData.items.map((item) => ({
          ...item,
          product: products.find((p) => p.id === parseInt(item.productId)),
        })),
      };

      setOrders([...orders, newOrder]);
      showNotification("Commande créée avec succès", "success");
    }

    setIsFormOpen(false);
    setEditingOrder(null);
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
  };

  return (
    <div className="space-y-6">
      {/* Version imprimable cachée */}
      <div className="hidden">
        <PrintOrder order={selectedOrder} />
      </div>

      {/* En-tête */}
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-2xl font-semibold text-gray-900">Commandes</h1>
        <div className="flex space-x-2">
          {selectedOrder && (
            <>
              <button
                onClick={handlePrint}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                title="Imprimer (Ctrl+P)"
              >
                <PrinterIcon className="h-5 w-5 mr-1" />
                Imprimer
              </button>
              <button
                onClick={() => handleDeleteOrder(selectedOrder)}
                className="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
              >
                <TrashIcon className="h-5 w-5 mr-1" />
                Supprimer
              </button>
            </>
          )}
          <AddOrderButton onClick={handleAddOrder} />
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="max-w-md">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Rechercher par n° de commande, client ou commercial..."
        />
        <p className="mt-1 text-sm text-gray-500">
          {filteredOrders.length} résultat{filteredOrders.length > 1 ? "s" : ""}
        </p>
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OrderList orders={filteredOrders} onSelectOrder={setSelectedOrder} />

        <div className="lg:sticky lg:top-6">
          {selectedOrder && (
            <div className="relative">
              <button
                onClick={() => handleEditOrder(selectedOrder)}
                className="absolute top-4 right-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Modifier
              </button>
              <OrderDetails
                order={selectedOrder}
                onUpdateStatus={handleUpdateStatus}
              />
            </div>
          )}
        </div>
      </div>

      {/* Modales et notifications */}
      {isFormOpen && (
        <OrderForm
          order={editingOrder}
          onSubmit={handleSubmitOrder}
          onClose={() => {
            setIsFormOpen(false);
            setEditingOrder(null);
          }}
        />
      )}

      <ConfirmationModal
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={confirmDelete}
        title="Supprimer la commande"
        message={`Êtes-vous sûr de vouloir supprimer la commande ${orderToDelete?.number} ? Cette action est irréversible.`}
      />

      {notification && (
        <NotificationToast
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default Orders;
