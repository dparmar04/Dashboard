"use client";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";


export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login & signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, signup, checkUserExists } = useAuth(); // Get functions from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // Login logic
      const userExists = await checkUserExists(email);
      if (!userExists) {
        toast.error("User not found! Please sign up first.");
        setIsLogin(false);
        return;
      }
      login(email, password);
    } else {
      // Signup logic
      const userExists = await checkUserExists(email);
      if (userExists) {
        toast.error("User already exists! Please login.");
        setIsLogin(true);
        return;
      }
      signup(email, password);
      toast.success("Signup successful! Please login.");
      setIsLogin(true);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-600">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {/* Tabs for Login & Signup */}
        <div className="flex mb-4">
          <button
            className={`w-1/2 p-2 font-semibold rounded cursor-pointer ${isLogin ? "bg-blue-700 text-white" : "bg-gray-200 text-black"}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`w-1/2 p-2 font-semibold rounded cursor-pointer ${!isLogin ? "bg-blue-700 text-white" : "bg-gray-200 text-black"}`}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </button>
        </div>

        <h2 className="text-xl font-medium text-center mb-4 text-black">{isLogin ? "Login" : "Signup"} Form</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="w-full p-2 mb-4 border rounded text-black"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full p-2 mb-4 border rounded text-black"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-blue-600 cursor-pointer text-white p-2 rounded hover:bg-blue-700">
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
}
