// src/components/Order/OrderForm.jsx
import React, { useState, useEffect } from "react";
import { XMarkIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { salesReps, clients, products } from "../../data/mockData";

const OrderForm = ({ order, onSubmit, onClose }) => {
  const initialFormState = {
    salesRepId: "",
    clientId: "",
    date: new Date().toISOString().split("T")[0],
    items: [{ productId: "", quantity: 1 }],
    status: "en attente",
  };

  const [formData, setFormData] = useState(order || initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (order) {
      setFormData(order);
    }
  }, [order]);

  // Gestionnaire de changement pour les champs principaux
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Effacer l'erreur quand l'utilisateur modifie le champ
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Calcul des totaux
  const calculateTotals = (items) => {
    const subtotal = items.reduce((sum, item) => {
      const product = products.find((p) => p.id === parseInt(item.productId));
      return sum + item.quantity * (product?.price || 0);
    }, 0);
    const tax = subtotal * 0.15255; // TVA à 15.255%
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  // Gestion des articles
  const handleItemChange = (index, field, value) => {
    const newItems = formData.items.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          [field]: field === "quantity" ? parseInt(value) || 0 : value,
        };
      }
      return item;
    });

    const { subtotal, tax, total } = calculateTotals(newItems);
    setFormData((prev) => ({
      ...prev,
      items: newItems,
      subtotal,
      tax,
      total,
    }));
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { productId: "", quantity: 1 }],
    }));
  };

  const removeItem = (index) => {
    if (formData.items.length === 1) return;

    const newItems = formData.items.filter((_, i) => i !== index);
    const { subtotal, tax, total } = calculateTotals(newItems);
    setFormData((prev) => ({
      ...prev,
      items: newItems,
      subtotal,
      tax,
      total,
    }));
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    if (!formData.salesRepId)
      newErrors.salesRepId = "Veuillez sélectionner un commercial";
    if (!formData.clientId)
      newErrors.clientId = "Veuillez sélectionner un client";
    if (!formData.date) newErrors.date = "La date est requise";

    formData.items.forEach((item, index) => {
      if (!item.productId) {
        newErrors[`item-${index}-product`] = "Veuillez sélectionner un produit";
      }
      if (item.quantity <= 0) {
        newErrors[`item-${index}-quantity`] =
          "La quantité doit être supérieure à 0";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-start pt-10 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4 mb-10">
        {/* En-tête */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">
            {order ? "Modifier la commande" : "Nouvelle commande"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Commercial et Date */}
          <div className="grid grid-cols-2 gap-4">
            {/* Commercial */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Commercial <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.salesRepId}
                onChange={(e) => handleChange("salesRepId", e.target.value)}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                  errors.salesRepId ? "border-red-500" : ""
                }`}
              >
                <option value="">Sélectionnez un commercial</option>
                {salesReps.map((rep) => (
                  <option key={rep.id} value={rep.id}>
                    {rep.name}
                  </option>
                ))}
              </select>
              {errors.salesRepId && (
                <p className="mt-1 text-sm text-red-500">{errors.salesRepId}</p>
              )}
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                  errors.date ? "border-red-500" : ""
                }`}
              />
              {errors.date && (
                <p className="mt-1 text-sm text-red-500">{errors.date}</p>
              )}
            </div>
          </div>

          {/* Client */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Client <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.clientId}
              onChange={(e) => handleChange("clientId", e.target.value)}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                errors.clientId ? "border-red-500" : ""
              }`}
            >
              <option value="">Sélectionnez un client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
            {errors.clientId && (
              <p className="mt-1 text-sm text-red-500">{errors.clientId}</p>
            )}
          </div>

          {/* Articles */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-md font-medium">Articles</h3>
              <button
                type="button"
                onClick={addItem}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Ajouter un article
              </button>
            </div>

            {formData.items.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 items-start border p-4 rounded-lg"
              >
                {/* Produit */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Produit <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={item.productId}
                    onChange={(e) =>
                      handleItemChange(index, "productId", e.target.value)
                    }
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                      errors[`item-${index}-product`] ? "border-red-500" : ""
                    }`}
                  >
                    <option value="">Sélectionnez un produit</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} - {product.price} €
                      </option>
                    ))}
                  </select>
                  {errors[`item-${index}-product`] && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors[`item-${index}-product`]}
                    </p>
                  )}
                </div>

                {/* Quantité */}
                <div className="w-24">
                  <label className="block text-sm font-medium text-gray-700">
                    Quantité
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                {/* Prix total de la ligne */}
                <div className="w-32">
                  <label className="block text-sm font-medium text-gray-700">
                    Total
                  </label>
                  <input
                    type="text"
                    value={`${(
                      (products.find((p) => p.id === parseInt(item.productId))
                        ?.price || 0) * item.quantity
                    ).toFixed(2)} €`}
                    disabled
                    className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 text-right"
                  />
                </div>

                {/* Bouton supprimer */}
                {formData.items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="mt-6 text-red-600 hover:text-red-700"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Totaux */}
          <div className="border-t pt-4">
            <div className="flex justify-end space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Sous-total</p>
                <p className="text-sm text-gray-500">TVA (15.255%)</p>
                <p className="text-lg font-medium mt-2">Total</p>
              </div>
              <div className="text-right w-32">
                <p className="text-sm text-gray-900">
                  {formData.subtotal?.toFixed(2) || "0.00"} €
                </p>
                <p className="text-sm text-gray-900">
                  {formData.tax?.toFixed(2) || "0.00"} €
                </p>
                <p className="text-lg font-medium mt-2">
                  {formData.total?.toFixed(2) || "0.00"} €
                </p>
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              {order ? "Modifier" : "Créer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
