"use client";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Import menu & close icons

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-blue-600 border-r-2 border-gray-300">
      {/* Toggle Button (Visible on Small Screens) */}
      <button
        className="lg:hidden p-2 m-2 text-white bg-gray-300 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} className="text-black" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-blue-600 border-r-2 border-gray-300 text-white h-screen p-4 transform transition-transform duration-300 ease-in-out flex-col z-20
        ${isOpen ? "translate-x-0" : "-translate-x-64"} lg:translate-x-0 lg:relative lg:flex`}
      >
        <h2 className="text-lg font-semibold mb-4 text-white">Menu</h2>
        <ul>
          <li className="p-2 bg-blue-500 rounded text-white">Details</li>
        </ul>
      </div>

      {/* Overlay (only for mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}
