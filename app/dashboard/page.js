"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../component/Navbar";
import Sidebar from "../../component/Sidebar";
import Table from "../../component/Table";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/"); // Redirect if no user is found
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="flex flex-col md:flex-row h-screen md:h-screen lg:h-full">
      <Sidebar />
      <div className="flex-1 bg-blue-50">
        <Navbar />
        <Table />
      </div>
    </div>
  );
}
