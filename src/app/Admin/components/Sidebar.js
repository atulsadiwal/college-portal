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
    { title: "Dashboard", icon: <MdDashboard />, subList: [] },
    { title: "College", icon: <MdOutlineAccountBalance />, subList: ["Add College", "List Of Colleges"] },
    { title: "Accommodation", icon: <FaBuilding />, subList: ["Add Accomodations", "List Of Accomodatons"] },
    { title: "Department", icon: <FaSection />, subList: ["Add Dapartment", "List Of Department"] },
    { title: "Program", icon: <FiBook />, subList: ["Add Program", "List Of Programmes"] },
    { title: "Stream", icon: <FaStream />, subList: ["Add Stream", "List Of Streams",] },
  ];

  const toggleSublist = (index) => {
    setActiveItem(activeItem === index ? null : index);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-[#1c2333] text-white w-60 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 md:translate-x-0 z-50`}
    >
      {/* Logo */}
      <div className="p-4 text-lg flex font-bold ">
        <div className="p-1 bg-blue-600 text-white me-2 ms-1  rounded-lg">
            <GiNetworkBars/>
            </div>
        TailAdmin
      </div>

      {/* Menu Items */}
      <ul className="mt-8 px-4">
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
              <ul className="pl-8 bg-[#1c2333]">
                {item.subList.map((subItem, i) => (
                  <li
                    key={i}
                    className="p-2 text-sm hover:bg-gray-700 transition cursor-pointer"
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
