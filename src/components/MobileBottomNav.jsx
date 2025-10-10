import React from "react";
import { FiHome,  FiMessageCircle,FiGrid } from "react-icons/fi";
import Shop from "../assets/shop.png";
import Home from "../assets/element-3.png";
import Wallet from "../assets/wallet-2.png";
export default function MobileBottomNav() {
  const navItems = [
    { icon: <img src={Home} alt="Shop" className="w-6 h-6" />, active: false },
    { icon: <img src={Shop} alt="Shop" className="w-6 h-6" />, active: true },
    { icon: <img src={Wallet} alt="Shop" className="w-6 h-6" />, active: false },
    
  ];

  return (
    <div className="md:hidden fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-[#113355] shadow-md rounded-[12px] px-3 py-2 flex items-center justify-center gap-4">
      {navItems.map((item, idx) => (
        <button
          key={idx}
          className={`p-3 rounded-full text-xl transition ${
            item.active
              ? "bg-[#113355] text-white shadow"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
}
