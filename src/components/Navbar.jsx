// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import {
  HomeIcon,
  DocumentTextIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const navItems = [
    { name: "Accueil", icon: HomeIcon, path: "/" },
    { name: "Factures", icon: DocumentTextIcon, path: "/factures" },
    { name: "Commandes", icon: ShoppingCartIcon, path: "/commandes" },
    { name: "Clients", icon: UserGroupIcon, path: "/clients" },
    { name: "Paramètres", icon: Cog6ToothIcon, path: "/parametres" },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-900"
              >
                <item.icon className="h-5 w-5 mr-1" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
