"use client";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { useState } from "react";
import "../../styles/globals.css"

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 min-h-screen bg-gray-100">
        <Header toggleSidebar={toggleSidebar} />
        <main className="p-4 md:ml-64">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;