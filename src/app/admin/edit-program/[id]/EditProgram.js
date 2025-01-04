"use client";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const EditProgram = () => {
  const router = useRouter();
  const { id } = router.query; // Access `id` from the router.query

  const [formData, setFormData] = useState({
    name: "",
    short_name: "",
    description: "",
  });

  useEffect(() => {
    if (id) { // Ensure `id` is available before making the request
      const fetchProgramData = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/program/${id}`);
          const programData = await response.json();
          setFormData({
            name: programData.name,
            short_name: programData.short_name,
            description: programData.description,
          });
        } catch (error) {
          console.error("Failed to fetch program data:", error);
        }
      };

      fetchProgramData();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/program/update/${id}`, {
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
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Edit Program: {id}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Short Name</label>
          <input
            type="text"
            value={formData.short_name}
            onChange={(e) =>
              setFormData({ ...formData, short_name: e.target.value })
            }
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Update Program
        </button>
      </form>
    </div>
  );
};

export default EditProgram;
