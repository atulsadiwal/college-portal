"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { use } from "react"; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EditCollege = ({ params }) => {
  const router = useRouter();

  
  const { id } = use(params); 

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    state: "",
    established_year: "",
    affiliated_university: "",
    college_type: "Public",
    ranking: "",
    accreditation: "",
    placement_details: {
      highest_package: "",
      avg_package: "",
    },
    hostel_availability: false,
    scholarship_details: "",
    phone: "",
    email: "",
    location: {
      latitude: "",
      longitude: "",
    },
    images: "",
    datasheet_url: "",
    website_url: "",
  });

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const response = await fetch(`${BASE_URL}/college/colleges/${id}`);
        const result = await response.json();

        if (result.status && result.data) {
          setFormData(result.data);
        } else {
          console.error("Failed to fetch College data:", result);
        }
      } catch (error) {
        console.error("Error fetching College data:", error);
      }
    };

    fetchCollege();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/college/colleges/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("College updated successfully!");
        router.push("/Admin/list-of-colleges"); 
      } else {
        const error = await response.json();
        alert(`Failed to update: ${error.message}`);
      }
    } catch (error) {
      console.error("Error updating College:", error);
    }
  };

  return (
    <div className="container p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4 text-start">Edit College</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 space-y-4 w-full ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm mb-2 font-medium text-gray-700">College Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            className="w-full p-2  border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 text-base placeholder-gray-400"
            value={formData.name}
            placeholder="Enter College Name"
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
          />
        </div>
      </div>
  
      {/* State and Established Year */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm mb-2 font-medium text-gray-700">State</label>
          <input
            type="text"
            name="state"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 text-base placeholder-gray-400"
            value={formData.state}
          />
        </div>
        <div>
          <label className="block text-sm mb-2 font-medium text-gray-700">Established Year</label>
          <input
            type="number"
            name="established_year"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 text-base placeholder-gray-400"
            value={formData.established_year}
          />
        </div>
      </div>
  
      {/* Affiliated University and College Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm mb-2 font-medium text-gray-700">Affiliated University Name</label>
          <input
            type="text"
            name="affiliated_university"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 text-base placeholder-gray-400"
            value={formData.affiliated_university}
          />
        </div>
        <div>
          <label className="block text-sm mb-2 font-medium text-gray-700">College Type</label>
          <select
            name="college_type"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 text-base placeholder-gray-400"
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
            <option value="Government">Government</option>
          </select>
        </div>
      </div>
  
      {/* Ranking and Accreditation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm mb-2 font-medium text-gray-700">Ranking</label>
          <input
            type="number"
            name="ranking"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 text-base placeholder-gray-400"
            value={formData.ranking}
          />
        </div>
        <div>
          <label className="block text-sm mb-2 font-medium text-gray-700">Accreditation</label>
          <input
            type="text"
            name="accreditation"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 text-base placeholder-gray-400"
            value={formData.accreditation}
          />
        </div>
      </div>
  
      {/* Placement Details */}
      <h6 className="text-2xl font-semibold text-gray-800 mt-6">Placement Details</h6>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm mb-2 font-medium text-gray-700">Highest Package</label>
          <input
            type="number"
            name="placement_details.highest_package"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 text-base placeholder-gray-400"
            value={formData.highest_package}
          />
        </div>
        <div>
          <label className="block text-sm mb-2 font-medium text-gray-700">Average Package</label>
          <input
            type="number"
            name="placement_details.avg_package"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 text-base placeholder-gray-400"
            value={formData.avg_package}
          />
        </div>
      </div>
  
      {/* Hostel Availability */}
      <div>
        <label className="flex items-center text-sm mb-2 font-medium text-gray-700">
          <input
            type="checkbox"
            name="hostel_availability"
            onChange={handleChange}
            className="form-checkbox text-blue-600"
          />
          <span className="ml-2">Hostel Availability</span>
        </label>
      </div>
  
      {/* Scholarship Details */}
      <div>
        <label className="block text-sm mb-2 font-medium text-gray-700">Scholarship Details</label>
        <input
          type="text"
          name="scholarship_details"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 text-base placeholder-gray-400"
          value={formData.scholarship_details}
        />
      </div>
  
      {/* Phone and Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm mb-2 font-medium text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 text-base placeholder-gray-400"
            value={formData.phone}
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
          />
        </div>
      </div>
  
      {/* Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm mb-2 font-medium text-gray-700">Latitude</label>
          <input
            type="text"
            name="latitude"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 text-base placeholder-gray-400"
            value={formData.latitude}
          />
        </div>
        <div>
          <label className="block text-sm mb-2 font-medium text-gray-700">Longitude</label>
          <input
            type="text"
            name="longitude"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 text-base placeholder-gray-400"
            value={formData.longitude}
          />
        </div>
      </div>

        {/* Image, Datasheet, and Website URLs */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label className="block mb-1 font-semibold text-sm mb-2">Image URL</label>
        <input
          type="text"
          name="images"
          onChange={handleChange}
          className="w-full p-2 border rounded text-xs shadow-sm text-sm mb-2"
          value={formData.images}
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold text-sm mb-2">Datasheet URL</label>
        <input
          type="text"
          name="datasheet_url"
          onChange={handleChange}
          className="w-full p-2 border rounded text-xs shadow-sm text-sm mb-2"
          value={formData.datasheet_url}
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold text-sm mb-2">Website URL</label>
        <input
          type="text"
          name="website_url"
          onChange={handleChange}
          className="w-full p-2 border rounded text-xs shadow-sm text-sm mb-2"
          value={formData.website_url}
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

export default EditCollege;
