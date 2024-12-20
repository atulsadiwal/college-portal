
"use client"; // For Next.js app directory support

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddAccomodation() {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    address: "",
    city: "",
    country: "",
    pincode: "Public",
    latitude: "",
    longitude: "",
    price: "",
    amenities: "",
    phone:"",
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
        "https://college-portal-backend-y8d9.onrender.com/api/accommodation/add-accommodation",
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
    <ToastContainer/>
      <h1 className="text-2xl font-bold mb-4 text-start ">Add New Accomodation</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 space-y-4 w-full  "
      >
        {/* Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-semibold">Accomodation Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter Accomodation name"
            required
          />
        </div>
        <div>
            <label className="block mb-1 font-semibold">Type</label>
            <select
              name="type"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="Hostel">Hostel</option>
              <option value="Pg">Pg</option>
              <option value="Apartment">Apartment</option>
            </select>
          </div>
        </div>

        {/* City and State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div>
            <label className="block mb-1 font-semibold">Address</label>
            <input
              type="text"
              name="address"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter Address"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">City</label>
            <input
              type="text"
              name="city"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter City"
              required
            />
          </div>
        </div>

        {/* */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Country</label>
            <input
              type="text"
              name="country"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter Country Name"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Pincode</label>
            <input
              type="text"
              name="pincode"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter Pincode"
              required
            />
          </div>
          
        </div>

        {/* latitude and longitude */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-semibold">Latitude</label>
          <input
            type="number"
            name="latitude"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter Latitude"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Longitude</label>
          <input
            type="number"
            name="longitude"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter Longitude"
          />
        </div>
       </div>

        {/* Highest and Average Package */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Price</label>
            <input
              type="text"
              name="price"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter highest package"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Amenities</label>
            <input
              type="text"
              name="amenities"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter Amenities"
              required
            />
          </div>
        </div>

        
         {/* phone, email and images */}
        <div className = "grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
            <label className="block mb-1 font-semibold">Phone</label>
            <input
              type="text"
              name="phone"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter phone number"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter email"
              required
            />
          </div>
         <div >
          <label className ="block mb-1 font-semibold">Image URL</label>
          <input
           type="text"
           name= "images"
           onChange= {handleChange}
           className = "w-full p-2 border rounded"
           placeholder = "Enter Image URL"
           required
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

export default AddAccomodation;
