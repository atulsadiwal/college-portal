"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";  // Use useParams hook to access route params

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EditProgramPage = () => {
  const { id } = useParams(); // Use useParams hook to get the dynamic parameter
  const [formData, setFormData] = useState({
    name: "",
    short_name: "",
    description: "",
  });

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/program/get-by-id/${id}`);
        const programData = await response.json();
        
        if (response.ok) {
          setFormData({
            name: programData.name,
            short_name: programData.short_name,
            description: programData.description,
          });
        } else {
          console.error("Program not found or API error.");
        }
      } catch (error) {
        console.error("Failed to fetch program data:", error);
      }
    };

    if (id) {
      fetchProgramData();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/program/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Program updated successfully!");
      } else {
        console.error("Failed to update program.");
      }
    } catch (error) {
      console.error("Error during update:", error);
    }
  };

  return (
<div className="container p-4">
  <h1 className="text-2xl font-bold mb-4 text-start">
    Edit Program - {id}
  </h1>
  <form
    onSubmit={handleSubmit}
    className="bg-white shadow-lg rounded-lg p-6 space-y-4 w-full"
  >
    {/* Program Details */}
    <div className="grid grid-cols-1 gap-6">
      {/* Name Field */}
      <div>
        <label className="block text-sm mb-2 font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          className="w-full p-2 border border-gray-300 rounded-lg text-xs placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Program Name"
          required
        />
      </div>
      {/* Short Name Field */}
      <div>
        <label className="block text-sm mb-2 font-medium text-gray-700">
          Short Name
        </label>
        <input
          type="text"
          value={formData.short_name}
          onChange={(e) =>
            setFormData({ ...formData, short_name: e.target.value })
          }
          className="w-full p-3 border border-gray-300 rounded-lg text-base placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Short Name"
          required
        />
      </div>
      {/* Description Field */}
      <div>
        <label className="block text-sm mb-2 font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full p-3 border border-gray-300 rounded-lg text-base placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Description"
        />
      </div>
    </div>

    {/* Submit Button */}
    <div className="text-center">
        <button
          type="submit"
          className="bg-[#1c2333] hover:bg-opacity-90 text-white font-semibold py-2 px-6 rounded shadow-md"
        >
          Update Program
        </button>
        </div>
  </form>
</div>

  );
};

export default EditProgramPage;
