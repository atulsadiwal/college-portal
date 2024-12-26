"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { use } from "react"; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EditAffiliation = ({ params }) => {
  const router = useRouter();
  const { id } = params; // Ensure `params` is passed correctly
  
  const [formData, setFormData] = useState({
    name: "",
    short_name: "",
    description: "",
  });

  useEffect(() => {
    const isValidObjectId = (id) => /^[a-fA-F0-9]{24}$/.test(id);
    
    if (!isValidObjectId(id)) {
      console.error("Invalid ID format:", id);
      return;
    }

    const fetchAffiliation = async () => {
      try {
        const response = await fetch(`${BASE_URL}/affiliation/${id}`);
        const result = await response.json();

        if (result.status && result.data) {
          setFormData(result.data);
        } else {
          console.error("Failed to fetch Affiliation data:", result);
        }
      } catch (error) {
        console.error("Error fetching Affiliation data:", error);
      }
    };

    fetchAffiliation();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/affiliation/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Affiliation updated successfully!");
        router.push("/Admin/list-of-affiliations"); 
      } else {
        const error = await response.json();
        alert(`Failed to update: ${error.message}`);
      }
    } catch (error) {
      console.error("Error updating Affiliation:", error);
    }
  };

  return (
    <div className="container p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4 text-start">Edit Affiliation</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 space-y-4 w-full">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
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

export default EditAffiliation;
