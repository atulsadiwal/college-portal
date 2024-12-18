"use client";
import { useState } from "react";
import Sidebar from "./components/SideBar";
import Header from "./components/Header";

function Admin() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 min-h-screen bg-gray-100">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Content Area */}
        <main className="p-4 md:ml-64">
  <h1 className="text-2xl font-bold">Welcome to TailAdmin</h1>
  <p>This is a responsive layout with Sidebar and Header.</p>
</main>
      </div>
    </div>
  )
}

export default Admin