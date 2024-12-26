"use client";
import { FaEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const ListOfProgrammes = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const router = useRouter();
  const { id } = useParams(); // Use useParams to get the dynamic parameter

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch(`${BASE_URL}/program/get/all-programs`);
        if (!response.ok) {
          console.error(`API Error: ${response.status} - ${response.statusText}`);
          return;
        }

        const programData = await response.json();
        if (Array.isArray(programData.data)) {
          setData(programData.data); // Assuming data is inside programData.data
          setFilteredData(programData.data); // Set initial filtered data
        } else {
          console.error("Unexpected API response format:", programData);
          setData([]);
          setFilteredData([]);
        }
      } catch (error) {
        console.error("Failed to fetch programs:", error);
        setData([]);
        setFilteredData([]);
      }
    };
    fetchPrograms();
  }, []);

  useEffect(() => {
    const filter = search.toLowerCase();
    const filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(filter) ||
        item.short_name.toLowerCase().includes(filter) ||
        item.description.toLowerCase().includes(filter)
    );
    setFilteredData(filtered);
  }, [search, data]);

  const handleEdit = (id) => {
    router.push(`/Admin/edit-program/${id}`);
  };

  return (
    <div className="w-full">
      <h1 className="text-lg font-semibold mb-4 text-center text-[#1c2333]">List Of Programmes</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-[900px] w-full table-auto border-collapse">
          <thead className="bg-[#1c2333] text-white">
            <tr>
              <th className="px-4 py-1 text-left border border-gray-300">Name</th>
              <th className="px-4 py-1 text-left border border-gray-300">Short Name</th>
              <th className="px-4 py-1 text-left border border-gray-300">Description</th>
              <th className="px-4 py-1 text-center border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((program, index) => (
                <tr
                  key={program._id}
                  className={`border-t ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td className="px-4 py-1 text-xs font-medium text-gray-700 truncate">
                    {program.name}
                  </td>
                  <td className="px-4 py-1 text-xs text-gray-600 truncate">
                    {program.short_name}
                  </td>
                  <td className="px-4 py-1 text-xs text-gray-600 truncate">
                    {program.description}
                  </td>
                  <td className="px-4 py-1 text-xs text-center">
                    <button
                      onClick={() => handleEdit(program._id)}
                      className="bg-blue-500 text-white px-2 py-1.5 mx-auto rounded-lg flex items-center"
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-sm text-gray-500">
                  {data.length === 0
                    ? "No programs available or API is unreachable."
                    : "No matching programs found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListOfProgrammes;
