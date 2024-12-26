"use client";
import { useState } from "react";
import { ChartBarIcon, AcademicCapIcon, HomeIcon, BuildingOfficeIcon } from "@heroicons/react/24/outline";

const AdminDashBoard = () => {

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  const userActivityData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Users Per Day",
        data: [50, 70, 90, 110, 80, 60, 95],
        fill: false,
        borderColor: darkMode ? "#60A5FA" : "#4F46E5",
        tension: 0.4,
      },
    ],
  };


  return (
    <>
      <div
        className={`h-screen p-6 ${darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white"
          : "bg-gradient-to-br from-blue-50 via-white to-gray-100 text-gray-900"
          }`}
      >
        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={toggleDarkMode}
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-600 transition"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {[
            { title: "Total Users", value: "1,250", icon: <ChartBarIcon className="w-6 h-6" /> },
            { title: "Colleges Added", value: "35", icon: <BuildingOfficeIcon className="w-6 h-6" /> },
            { title: "Accommodations Added", value: "12", icon: <HomeIcon className="w-6 h-6" /> },
            { title: "Departments Added", value: "20", icon: <AcademicCapIcon className="w-6 h-6" /> },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`rounded-lg shadow-lg p-6 flex items-center justify-between ${darkMode ? "bg-gray-800" : "bg-white"
                }`}
            >
              <div>
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-2xl font-bold">{item.value}</p>
              </div>
              <div
                className={`p-2 rounded-lg ${darkMode ? "bg-indigo-500" : "bg-indigo-100 text-indigo-800"
                  }`}
              >
                {item.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Graph Section */}
        {/* <div className={`rounded-lg shadow-lg p-6 mb-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                    <h2 className="text-lg font-semibold mb-4">User Activity (Weekly)</h2>
                    <div className="w-full h-64">
                        <Line data={userActivityData} />
                    </div>
                </div> */}

        {/* Quick Actions Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Notices Section */}
          <div className={`rounded-lg shadow-lg p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h2 className="text-lg font-semibold mb-4">Recent Notices</h2>
            <ul>
              {[
                "New college affiliation requests pending approval",
                "Hostel accommodation guidelines updated",
                "Annual report submission deadline approaching",
              ].map((notice, idx) => (
                <li key={idx} className="mb-2">
                  <span
                    className={`block p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"
                      }`}
                  >
                    {notice}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tasks Section */}
          <div className={`rounded-lg shadow-lg p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h2 className="text-lg font-semibold mb-4">Pending Tasks</h2>
            <ul>
              {[
                "Add newly affiliated colleges",
                "Review and approve department additions",
                "Verify stream and program mappings",
              ].map((task, idx) => (
                <li key={idx} className="mb-2">
                  <span
                    className={`block p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"
                      }`}
                  >
                    {task}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
          © 2024 College Portal Admin. All rights reserved.
        </footer>
      </div>
    </>
  );
}

export default AdminDashBoard;
