"use client"; // For Next.js app directory support

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL


function AddAffiliation() {
  const [formData, setFormData] = useState({
    name: "",
    short_name: "",
    description: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes("placement_details")) {
      const key = name.split(".")[1];
      setFormData({
        ...formData,
        placement_details: {
          ...formData.placement_details,
          [key]: value,
        },
      });
    } else if (name.includes("location")) {
      const key = name.split(".")[1];
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          [key]: value,
        },
      });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${BASE_URL}/affiliation/add-affiliation`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success("College data uploaded successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(result);
      } else {
        toast.error(result.message || "Error uploading data.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while uploading data.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="container p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold px-4 mb-6 text-[#1c2333]">Add New Affiliation</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-4 space-y-4 w-full"
      >
        {/* Affiliation Name */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Affiliation Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="w-full p-2 text-xs border border-gray-300 rounded placeholder-gray-400"
              placeholder="Enter Affiliation name"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Short Name</label>
            <input
              type="text"
              name="short_name"
              onChange={handleChange}
              className="w-full p-2 text-xs border border-gray-300 rounded placeholder-gray-400"
              placeholder="Enter Short Name"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              onChange={handleChange}
              className="w-full p-2 text-xs border border-gray-300 rounded placeholder-gray-400"
              placeholder="Enter Description"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <a
            href="#"
            className="bg-[#1c2333] hover:bg-opacity-90 text-white font-semibold py-2 px-6 rounded shadow-md"
          >
            Submit
          </a>
        </div>
      </form>
    </div>

  );
}

export default AddAffiliation;
