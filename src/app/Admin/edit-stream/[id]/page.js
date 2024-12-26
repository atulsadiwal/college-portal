"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EditStream = () => {
  const router = useRouter();
  const { id } = useParams(); // Call useParams as a function
  const [formData, setFormData] = useState({
    name: "",
    short_name: "",
    description: "",
  });

  useEffect(() => {
    if (!id) {
      console.error("Stream ID is undefined.");
      return;
    }

    const fetchStream = async () => {
      try {
        console.log("Fetching Stream with ID:", id); // Debugging
        const response = await fetch(`${BASE_URL}/stream/${id}`);
        const result = await response.json();

        if (result.status && result.data) {
          setFormData(result.data);
        } else {
          console.error("Failed to fetch stream data:", result);
        }
      } catch (error) {
        console.error("Error fetching stream data:", error);
      }
    };

    fetchStream();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) {
      alert("Invalid Stream ID.");
      return;
    }

    try {
      console.log("Updating Stream with ID:", id); // Debugging
      const response = await fetch(`${BASE_URL}/stream/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Stream updated successfully!");
        router.push("/Admin/list-of-streams");
      } else {
        const error = await response.json();
        alert(`Failed to update: ${error.message}`);
      }
    } catch (error) {
      console.error("Error updating stream:", error);
    }
  };

  return (
    <div className="container p-4">
      <h1 className="text-2xl font-bold mb-4 text-start">Edit Stream</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 space-y-4 w-full">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 text-base placeholder-gray-400"
            placeholder="Enter Stream Name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Short Name</label>
          <input
            type="text"
            name="short_name"
            value={formData.short_name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-[#1c2333] hover:bg-opacity-90 text-white font-semibold py-2 px-6 rounded shadow-md"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStream;
