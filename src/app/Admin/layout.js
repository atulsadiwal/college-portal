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
    <html>
      
      <body>
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 min-h-screen bg-gray-100">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <main className="p-4 md:ml-64">{children}</main>
      </div>
    </div>
    </body>
    </html>
  );
};

export default AdminLayout;
