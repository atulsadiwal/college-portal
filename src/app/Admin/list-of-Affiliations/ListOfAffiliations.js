"use client"; // Add this directive at the top of the file

import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";  // Import Link for file-based navigation
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL


const ListOfAffiliations = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/affiliation/all-affilaition`,
        );
        const result = await response.json();

        // Adjust based on the correct API response structure
        if (result.status && result.data && Array.isArray(result.data.programs)) {
          setData(result.data.programs); // Use the programs array
          setFilteredData(result.data.programs); // Initialize filtered data
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
        item.short_name.toLowerCase().includes(filter) ||
        item.description.toLowerCase().includes(filter)
    );
    setFilteredData(filtered);
  };

  return (
    <div className="w-full">
            <h1 className="text-lg font-semibold mb-4 text-center text-[#1c2333]">List Of Affiliations</h1>
  {/* Table */}
  <div className="overflow-x-auto bg-white shadow-md rounded-lg">
    <table className="min-w-[900px] w-full table-auto border-collapse">
      <thead className="bg-[#1c2333] text-white">
        <tr>
          <th className="px-4 py-1 text-left border border-gray-300">Name</th>
          <th className="px-4 py-1 text-left border border-gray-300">
            Short Name
          </th>
          <th className="px-4 py-1 text-left border border-gray-300">
            Description
          </th>
          <th className="px-4 py-1 text-center border border-gray-300">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(filteredData) && filteredData.length > 0 ? (
          filteredData.map((affiliation, index) => (
            <tr
              key={affiliation.id}
              className={`border-t ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <td className="px-4 py-1 text-sm font-medium text-gray-700 truncate">
                {affiliation.name}
              </td>
              <td className="px-4 py-1 text-sm text-gray-600 truncate">
                {affiliation.short_name}
              </td>
              <td className="px-4 py-1 text-sm text-gray-600 truncate">
                {affiliation.description}
              </td>
              <td className="px-4 py-1 text-sm text-center">
              <Link href={`/Admin/edit-affiliation/${affiliation.id}`}>
                      <button className="bg-blue-500 text-white px-2 py-1 mx-auto rounded-lg flex items-center">
                        <span className="material-icons"><FaEdit/></span>
                      </button>
                    </Link>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="4"
              className="text-center py-4 text-sm text-gray-500"
            >
              No Affiliation found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default ListOfAffiliations;
