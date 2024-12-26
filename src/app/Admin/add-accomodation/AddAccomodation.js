
"use client"; // For Next.js app directory support

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL


function AddAccomodation() {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    state: "", // Add this line
    address: "",
    city: "",
    country: "",
    pincode: "",
    latitude: "",
    longitude: "",
    price: "",
    amenities: "",
    phone: "",
    email: "",
    images: "",
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
        `${BASE_URL}/accommodation/add-accommodation`,
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
  <h1 className="text-2xl font-bold mb-4 text-start">Add New Accommodation</h1>
  <form
    onSubmit={handleSubmit}
    className="bg-white shadow-lg rounded-lg p-6 space-y-4 w-full"
  >
    {/* Name */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm mb-2 font-medium text-gray-700">
          Accommodation Name
        </label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 text-base placeholder-gray-400"
          placeholder="Enter Accommodation name"
          required
        />
      </div>
      <div>
        <label className="block text-sm mb-2 font-medium text-gray-700">Type</label>
        <select
  name="type"
  value={formData.type} // Bind the value to formData
  onChange={handleChange}
  className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 text-base placeholder-gray-400"
  required
>
  <option value="">Select Type</option> {/* Add this option as a placeholder */}
  <option value="Hostel">Hostel</option>
  <option value="Pg">Pg</option>
  <option value="Apartment">Apartment</option>
</select>

      </div>

      

    </div>

    {/* Address and City */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div>
  <label className="block text-sm mb-2 font-medium text-gray-700">State</label>
  <input
    type="text"
    name="state"
    onChange={handleChange}
    className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 text-base placeholder-gray-400"
    placeholder="Enter State"
    required
  />
</div>
      <div>
        <label className="block text-sm mb-2 font-medium text-gray-700">Address</label>
        <input
          type="text"
          name="address"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 text-base placeholder-gray-400"
          placeholder="Enter Address"
          required
        />
      </div>
      <div>
        <label className="block text-sm mb-2 font-medium text-gray-700">City</label>
        <input
          type="text"
          name="city"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 text-base placeholder-gray-400"
          placeholder="Enter City"
          required
        />
      </div>
    </div>

    {/* Country and Pincode */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm mb-2 font-medium text-gray-700">Country</label>
        <input
          type="text"
          name="country"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 text-base placeholder-gray-400"
          placeholder="Enter Country Name"
          required
        />
      </div>
      <div>
        <label className="block text-sm mb-2 font-medium text-gray-700">Pincode</label>
        <input
          type="text"
          name="pincode"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 text-base placeholder-gray-400"
          placeholder="Enter Pincode"
          required
        />
      </div>
    </div>

    {/* Latitude and Longitude */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm mb-2 font-medium text-gray-700">Latitude</label>
        <input
          type="number"
          name="latitude"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 text-base placeholder-gray-400"
          placeholder="Enter Latitude"
        />
      </div>
      <div>
        <label className="block text-sm mb-2 font-medium text-gray-700">Longitude</label>
        <input
          type="number"
          name="longitude"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 text-base placeholder-gray-400"
          placeholder="Enter Longitude"
        />
      </div>
    </div>

    {/* Price and Amenities */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm mb-2 font-medium text-gray-700">Price</label>
        <input
          type="text"
          name="price"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 text-base placeholder-gray-400"
          placeholder="Enter Price"
          required
        />
      </div>
      <div>
        <label className="block text-sm mb-2 font-medium text-gray-700">Amenities</label>
        <input
          type="text"
          name="amenities"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 text-base placeholder-gray-400"
          placeholder="Enter Amenities"
          required
        />
      </div>
    </div>

    {/* Phone, Email, and Images */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm mb-2 font-medium text-gray-700">Phone</label>
        <input
          type="text"
          name="phone"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 text-base placeholder-gray-400"
          placeholder="Enter phone number"
          required
        />
      </div>
      <div>
        <label className="block text-sm mb-2 font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 text-base placeholder-gray-400"
          placeholder="Enter email"
          required
        />
      </div>
      <div>
        <label className="block text-sm mb-2 font-medium text-gray-700">Image URL</label>
        <input
          type="text"
          name="images"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 text-base placeholder-gray-400"
          placeholder="Enter Image URL"
          required
        />
      </div>
    </div>

    {/* Submit Button */}
    <div className="text-center">
      <button
        type="submit"
        className="bg-[#1c2333] hover:bg-opacity-90 text-white font-semibold py-2 px-6 rounded shadow-md"
      >
        Submit
      </button>
    </div>
  </form>
</div>

  );
}

export default AddAccomodation;
