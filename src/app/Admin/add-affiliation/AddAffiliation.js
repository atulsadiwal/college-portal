"use client"; // For Next.js app directory support

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddAffiliation() {
  const [formData, setFormData] = useState({
    name: "",
    short_name:"",
    description:"",
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
        "https://college-portal-backend-y8d9.onrender.com/api/affiliation/add-affiliation",
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
    <div className="container  p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4 text-start ">Add New Affiliation - </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 space-y-4 w-full  "
      >
        {/* College Name */}
        <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block mb-1 font-semibold"> Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter college name"
            required
          />
        </div>
        <div>
            <label className="block mb-1 font-semibold">Short Name</label>
            <input
              type="text"
              name="short_name"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter city"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Description</label>
            <input
              type="text"
              name="description"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter city"
            />
          </div>
        </div>

        


        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddAffiliation;
