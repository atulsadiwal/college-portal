"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { use } from "react"; 

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EditAccommodation = ({ params }) => {
  const router = useRouter();

  
  const { id } = use(params); 

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

  useEffect(() => {
    const fetchaccommodation = async () => {
      try {
        const response = await fetch(`${BASE_URL}/accommodation/accommodations/${id}`);
        const result = await response.json();
  
        if (result.status && result.data) {
          const normalizedData = normalizeData(result.data);
          setFormData(normalizedData);
        } else {
          console.error("Failed to fetch accommodation data:", result);
        }
      } catch (error) {
        console.error("Error fetching accommodation data:", error);
      }
    };
  
    fetchaccommodation();
  }, [id]);
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/accommodation/accomodations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("accommodation updated successfully!");
        router.push("/Admin/list-of-accommodations"); 
      } else {
        const error = await response.json();
        alert(`Failed to update: ${error.message}`);
      }
    } catch (error) {
      console.error("Error updating accommodation:", error);
    }
  };

  console.log("Form data after API fetch:", formData);

  return (
    <div className="container p-4">
      <h1 className="text-2xl font-bold mb-4 text-start">Edit accommodation</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 space-y-4 w-full ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm mb-2 font-medium text-gray-700">
          Accommodation Name
        </label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 text-base placeholder-gray-400"
          value={formData.name}
          required
        />
      </div>
      <div>
        <label className="block text-sm mb-2 font-medium text-gray-700">Type</label>
        <select
  name="type"
  value={formData.type || ""} // Ensure the value is set from `formData`
  onChange={handleChange}
  required
>
  <option value="Hostel">Hostel</option>
  <option value="Pg">Pg</option>
  <option value="Apartment">Apartment</option>
</select>
      </div>
    </div>

    {/* Address and City */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm mb-2 font-medium text-gray-700">Address</label>
        <input
          type="text"
          name="address"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 text-base placeholder-gray-400"
          value={formData.address}
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
          value={formData.city}
          required
        />
      </div>
    </div>

    {/* Country and Pincode */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm mb-2 font-medium text-gray-700">Country</label>
        <input
          type="text"
          name="country"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 text-base placeholder-gray-400"
          value={formData.country}
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
          value={formData.pincode}
          required
        />
      </div>
    </div>

    {/* Latitude and Longitude */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm mb-2 font-medium text-gray-700">Latitude</label>
        <input
          type="number"
          name="latitude"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 text-base placeholder-gray-400"
          value={formData.latitude}
        />
      </div>
      <div>
        <label className="block text-sm mb-2 font-medium text-gray-700">Longitude</label>
        <input
          type="number"
          name="longitude"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 text-base placeholder-gray-400"
          value={formData.longitude}
        />
      </div>
    </div>

    {/* Price and Amenities */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm mb-2 font-medium text-gray-700">Price</label>
        <input
          type="text"
          name="price"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 text-base placeholder-gray-400"
          value={formData.price}
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
          value={formData.amenities}
          required
        />
      </div>
    </div>

    {/* Phone, Email, and Images */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
      <div>
        <label className="block text-sm mb-2 font-medium text-gray-700">Phone</label>
        <input
          type="text"
          name="phone"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 text-base placeholder-gray-400"
          value={formData.phone}
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
          value={formData.email}
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
          value={formData.images}
          required
        />
      </div>
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

export default EditAccommodation;
