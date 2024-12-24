"use client"; 

import { useState, useEffect } from "react";
import Link from "next/link";  
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL


const ListOfColleges = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch(
         `${BASE_URL}/college/colleges`,
        );
        const result = await response.json();
        if (Array.isArray(result)) {
          setData(result);
          setFilteredData(result);
        } else {
          console.error("Unexpected response format:", result);
          setData([]);
          setFilteredData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
        setFilteredData([]);
      }
    };
  fetchData();

  }, []);

  const handleSearch = () => {
    // Filter data based on the search term
    const filter = search.toLowerCase();
    const filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(filter) ||
        item.city.toLowerCase().includes(filter) ||
        item.state.toLowerCase().includes(filter) ||
        item.university.toLowerCase().includes(filter) ||
        item.phone.includes(filter) ||
        item.email.toLowerCase().includes(filter)
    );
    setFilteredData(filtered);
  };

  return (
    <div className="w-full">
            <h1 className="text-lg font-semibold mb-4 text-center text-[#1c2333]">List Of Colleges</h1>
  {/* Table */}
  <div className="overflow-x-auto bg-white shadow-md rounded-lg">
    <table className="min-w-[900px] w-full table-auto border-collapse">
      <thead className="bg-[#1c2333] text-white">
        <tr>
          <th className="px-4 py-1 font-semibold text-left border border-gray-300">Name</th>
          <th className="px-4 py-1 font-semibold text-left border border-gray-300">City</th>
          <th className="px-4 py-1 font-semibold text-left border border-gray-300">State</th>
          <th className="px-4 py-1 font-semibold text-left border border-gray-300">Established</th>
          <th className="px-4 py-1 font-semibold text-left border border-gray-300">University</th>
          <th className="px-4 py-1 font-semibold text-left border border-gray-300">Type</th>
          <th className="px-4 py-1 font-semibold text-left border border-gray-300">Phone</th>
          <th className="px-4 py-1 font-semibold text-left border border-gray-300">Email</th>
          <th className="px-4 py-1 font-semibold text-left border border-gray-300">Image</th>
          <th className="px-4 py-1 font-semibold text-center border border-gray-300">Actions</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(filteredData) && filteredData.length > 0 ? (
          filteredData.map((college, index) => (
            <tr
              key={college.id}
              className={`border border-gray-300 ${
                index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
              } hover:bg-gray-200`}
            >
              <td className="px-4 py-3 text-sm text-gray-700 align-middle border border-gray-300 truncate">
                {college.name}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700 align-middle border border-gray-300 truncate">
                {college.city}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700 align-middle border border-gray-300 truncate">
                {college.state}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700 align-middle border border-gray-300 truncate">
                {college.establishedYear}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700 align-middle border border-gray-300 truncate">
                {college.university}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700 align-middle border border-gray-300 truncate">
                {college.type}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700 align-middle border border-gray-300 truncate">
                {college.phone}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700 align-middle border border-gray-300 truncate">
                {college.email}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700 align-middle border border-gray-300 truncate">
                <img
                  src={college.image}
                  alt={college.name}
                  className="w-12 h-12 object-cover rounded-md"
                />
              </td>
              <td className="px-4 py-3 text-center text-sm text-gray-700 align-middle border border-gray-300">
              <Link href={`/Admin/edit-college/${college.id}`}>
                      <button className="bg-blue-500 text-white px-2 py-1 mx-auto rounded-lg flex items-center">
                        <span className="material-icons"><FaEdit/></span>
                      </button>
                    </Link>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="10" className="text-center py-6 text-gray-500 text-sm">
              No colleges found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default ListOfColleges;
