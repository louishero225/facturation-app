// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Clients from "./pages/Clients";
import Orders from "./pages/Orders";
import Invoices from "./pages/Invoices";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/factures" element={<Invoices />} />
            <Route path="/commandes" element={<Orders />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/parametres" element={<div>Paramètres</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
