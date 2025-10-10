import React from "react";
import {
  FiGrid,
  FiShoppingBag,
  FiMessageCircle,
  FiCreditCard,
  FiHelpCircle,
  FiLogOut,
  FiSettings,
} from "react-icons/fi";
import Logo from "../assets/logo.png";

export default function Sidebar() {
  const navItems = [
    { label: "Overview", icon: <FiGrid /> },
    { label: "Marketplace", icon: <FiShoppingBag />, active: true },
    { label: "Messages", icon: <FiMessageCircle /> },
    { label: "Wallet", icon: <FiCreditCard /> },
    { label: "Settings", icon: <FiSettings /> },
  ];

  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-64 bg-[#113355] text-white p-6 z-50">
      {/* Logo section */}
      <div className="mb-10 flex items-center gap-2">
        <img
          src={Logo}
          alt="Enterpriisiin logo"
          className="w-7 h-7 object-contain"
        />
        <h1 className="font-semibold text-lg tracking-tight">enterpriisiin</h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 text-sm">
        {navItems.map((item, idx) => (
          <button
            key={idx}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
              item.active
                ? "bg-[#1A4D80] text-white font-medium"
                : "text-gray-300 hover:bg-[#1B263B]/50 hover:text-white"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="mt-auto flex flex-col gap-2 pt-8 text-sm">
        <button className="flex items-center gap-2 text-gray-300 hover:text-white transition">
          <FiHelpCircle className="text-lg" />
          Help & Support
        </button>
        <button className="flex items-center gap-2 text-gray-300 hover:text-white transition">
          <FiLogOut className="text-lg" />
          Logout
        </button>
      </div>
    </aside>
  );
}
