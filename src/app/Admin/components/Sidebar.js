"use client";
import { useState } from "react";
import { FiChevronDown, FiBook,} from "react-icons/fi";
import { MdOutlineAccountBalance } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { FaBuilding, FaStream } from "react-icons/fa";
import { FaSection } from "react-icons/fa6";
import { GiNetworkBars } from "react-icons/gi";




const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [activeItem, setActiveItem] = useState(null);

  // Data for list items and their sublists
  const menuItems = [
    { title: "Dashboard", icon: <MdDashboard />, subList: ["Overview", "Stats"] },
    { title: "College", icon: <MdOutlineAccountBalance />, subList: ["Staff", "Students"] },
    { title: "Accommodation", icon: <FaBuilding />, subList: ["Hostels", "Rooms"] },
    { title: "Department", icon: <FaSection />, subList: ["Science", "Commerce", "Arts"] },
    { title: "Program", icon: <FiBook />, subList: ["B.Tech", "M.Tech"] },
    { title: "Stream", icon: <FaStream />, subList: ["CSE", "ECE", "IT"] },
  ];

  const toggleSublist = (index) => {
    setActiveItem(activeItem === index ? null : index);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-gray-800 text-white w-56 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 md:translate-x-0 z-50`}
    >
      {/* Logo */}
      <div className="p-4 text-lg flex font-bold border-b border-gray-700">
        <div className="p-1 bg-blue-600 text-white ml-1 rounded-lg">
            <GiNetworkBars/>
            </div>
        TailAdmin
      </div>

      {/* Menu Items */}
      <ul className="mt-4">
        {menuItems.map((item, index) => (
          <li key={index}>
            <button
              className="w-full flex justify-between items-center p-3 hover:bg-gray-700 transition"
              onClick={() => toggleSublist(index)}
            >
              <div className="flex items-center space-x-2">
                {item.icon}
                <span>{item.title}</span>
              </div>
              <FiChevronDown
                className={`transition-transform ${
                  activeItem === index ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
            {/* Sublist */}
            {activeItem === index && (
              <ul className="pl-8 bg-gray-700">
                {item.subList.map((subItem, i) => (
                  <li
                    key={i}
                    className="p-2 hover:bg-gray-600 transition cursor-pointer"
                  >
                    {subItem}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
