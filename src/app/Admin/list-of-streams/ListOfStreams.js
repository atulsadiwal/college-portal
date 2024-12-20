"use client"; // Add this directive at the top of the file

import { useState, useEffect } from "react";

const ListOfStreams = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://college-portal-backend-y8d9.onrender.com/api/stream/all-streams"
        );
        const result = await response.json();
        
        // Adjust based on the correct API response structure
        if (result.status && Array.isArray(result.data)) {
          setData(result.data); // Use the data array
          setFilteredData(result.data); // Initialize filtered data
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
      {/* Search Input */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-[900px] w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Short Name</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredData) && filteredData.length > 0 ? (
              filteredData.map((stream) => (
                <tr key={stream.id} className="border-t">
                  <td className="px-4 py-2">{stream.name}</td>
                  <td className="px-4 py-2">{stream.short_name}</td>
                  <td className="px-4 py-2">{stream.description}</td>
                  <td className="px-4 py-2 text-center">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded-lg flex items-center">
                      <span className="material-icons">edit</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-4">
                  No Stream found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListOfStreams;
