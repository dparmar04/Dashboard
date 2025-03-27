"use client";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { FiUser, FiLogOut, FiTrash2 } from "react-icons/fi"; // Icons

export default function Navbar() {
  const { user, logout, deleteAccount } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center bg-white text-black p-4 relative border-b-2 border-gray-300">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      
      {user && (
        <div className="relative">
          {/* User Icon */}
          <button onClick={() => setIsOpen(!isOpen)} className="p-3 bg-blue-600 cursor-pointer rounded-full">
            <FiUser size={24} className="text-white"/>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-max bg-white text-black shadow-md rounded-lg">
              <p className="p-3 text-sm border-b">{user.email}</p>
              <button onClick={logout} className="flex cursor-pointer items-center w-full px-3 py-2 hover:bg-gray-100">
                <FiLogOut className="mr-2" /> Logout
              </button>
              <button onClick={deleteAccount} className="flex cursor-pointer items-center w-full px-3 py-2 text-red-600 hover:bg-gray-100">
                <FiTrash2 className="mr-2" /> Delete Account
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
