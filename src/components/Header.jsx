import React from "react";
import { FiBell, FiSearch, FiChevronDown, FiMenu } from "react-icons/fi";
import avatar from "../assets/avatar.png";
import Logo from "../assets/Group.png";

export default function Header({ userName = "John Doe", date = "07 May, 2023", onMobileMenu }) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 shadow-sm">
     
      <div className="md:ml-64">
       
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 h-16">
          {/* ---------- DESKTOP HEADER ---------- */}
          <div className="hidden md:flex items-center justify-between w-full">
           
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Welcome Back, {userName}! 👋
              </h2>
              <p className="text-sm text-gray-500">{date}</p>
            </div>

           
            <div className="flex items-center gap-4 pr-8"> 
             
              <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                <FiSearch className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent outline-none text-sm text-gray-700 w-40 placeholder-gray-400"
                />
              </div>

              
              <button
                aria-label="Notifications"
                className="relative p-2 rounded-full hover:bg-gray-100 transition"
              >
                <FiBell className="text-gray-600 text-lg" />
                <span className="absolute top-2 right-2 block w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Avatar + Dropdown */}
              <div className="flex items-center gap-1 cursor-pointer">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-300 hover:ring-2 hover:ring-blue-100 transition">
                  <img
                    src={avatar}
                    alt="User avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <FiChevronDown className="text-gray-600 text-sm" />
              </div>
            </div>
          </div>

          {/* ---------- MOBILE HEADER ---------- */}
          <div className="flex md:hidden items-center justify-between w-full">
            {/* Left: Logo + Name */}
            <div className="flex items-center gap-2">
              <img
                src={Logo}
                alt="Enterpriisiin logo"
                className="w-7 h-7 object-contain"
              />
              <h1 className="font-semibold text-lg tracking-tight">enterpriisiin</h1>
            </div>

            {/* Right: Dropdown / Menu */}
            <div>
              <button
                onClick={onMobileMenu}
                aria-label="Open menu"
                className="p-2 rounded-lg hover:bg-gray-100 transition"
              >
                <FiMenu className="text-gray-700 text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
