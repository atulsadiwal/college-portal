"use client"; // Add this directive at the top of the file

import { useState, useEffect } from "react";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
import { FaEdit } from "react-icons/fa";
import Link from "next/link";


const ListOfAccomodations = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/accommodation/all-accommodations`
        );
        const result = await response.json();
  
        if (result.status && Array.isArray(result.data)) {
          setData(result.data);
          setFilteredData(result.data);
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
      <h1 className="text-lg font-semibold mb-4 text-center text-[#1c2333]">List Of Accommodations</h1>
  {/* Table */}
  <div className="w-[75vw] overflow-x-scroll bg-white shadow-md rounded-lg">
    <table className=" w-full table-auto border-collapse">
      <thead className="bg-[#1c2333] text-white">
        <tr>
          <th className="px-2 py-1 text-left border border-gray-300">Name</th>
          <th className="px-2 py-1 text-left border border-gray-300">Type</th>
          <th className="px-2 py-1 text-left border border-gray-300">Address</th>
          <th className="px-2 py-1 text-left border border-gray-300">City</th>
          <th className="px-2 py-1 text-left border border-gray-300">Country</th>
          <th className="px-2 py-1 text-left border border-gray-300">Pincode</th>
          <th className="px-2 py-1 text-left border border-gray-300">Price</th>
          <th className="px-2 py-1 text-left border border-gray-300">Amenities</th>
          <th className="px-2 py-1 text-left border border-gray-300">Phone</th>
          <th className="px-2 py-1 text-left border border-gray-300">Email</th>
          <th className="px-2 py-1 text-left border border-gray-300">Image</th>
          <th className="px-2 py-1 text-center border border-gray-300">Actions</th>
        </tr>
      </thead>
      <tbody>
  {Array.isArray(filteredData) && filteredData.length > 0 ? (
    filteredData.map((Accomo, index) => (
      <tr
        key={Accomo._id} // Use the correct unique identifier
        className={`border-t ${
          index % 2 === 0 ? "bg-gray-50" : "bg-white"
        }`}
      >
        <td className="px-4 py-1 text-sm font-medium text-gray-700 truncate">
          {Accomo.name}
        </td>
        <td className="px-4 py-1 text-sm text-gray-600 truncate">
          {Accomo.type}
        </td>
        <td className="px-4 py-1 text-sm text-gray-600 truncate">
          {Accomo.address}
        </td>
        <td className="px-4 py-1 text-sm text-gray-600 truncate">
          {Accomo.city}
        </td>
        <td className="px-4 py-1 text-sm text-gray-600 truncate">
          {Accomo.country}
        </td>
        <td className="px-4 py-1 text-sm text-gray-600 truncate">
          {Accomo.pincode}
        </td>
        <td className="px-4 py-1 text-sm text-gray-600 truncate">
          {Accomo.price}
        </td>
        <td className="px-4 py-1 text-sm text-gray-600 truncate">
          {Accomo.amenities.join(", ")} {/* Convert array to string */}
        </td>
        <td className="px-4 py-1 text-sm text-gray-600 truncate">
          {Accomo.phone}
        </td>
        <td className="px-4 py-1 text-sm text-gray-600 truncate">
          {Accomo.email}
        </td>
        <td className="px-4 py-1 text-sm text-gray-600">
          <img
            src={Accomo.images && Accomo.images[0]} // Display the first image
            alt={Accomo.name}
            className="w-12 h-12 object-cover rounded"
          />
        </td>
        <td className="px-4 py-1 text-sm text-center">
        <Link href={`/Admin/edit-accomodation/${Accomo._id}`}>
  <button className="bg-blue-500 text-white px-2 py-1 mx-auto rounded-lg flex items-center">
    <span className="material-icons"><FaEdit /></span>
  </button>
</Link>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td
        colSpan="12"
        className="text-center py-4 text-sm text-gray-500"
      >
        No Accommodation found.
      </td>
    </tr>
  )}
</tbody>

    </table>
  </div>
</div>

  );
};

export default ListOfAccomodations;
