"use client"; // For Next.js app directory support

import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddCollege() {
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
        "https://college-portal-backend-y8d9.onrender.com/api/college/add-college",
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
      <h1 className="text-2xl font-bold mb-4 text-start ">Add New College</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 space-y-4 w-full  "
      >
        {/* College Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-semibold">College Name</label>
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
            <label className="block mb-1 font-semibold">City</label>
            <input
              type="text"
              name="city"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter city"
            />
          </div>
        </div>

        {/* City and State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div>
            <label className="block mb-1 font-semibold">State</label>
            <input
              type="text"
              name="state"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter state"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Established Year</label>
            <input
              type="number"
              name="established_year"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter year"
            />
          </div>
        </div>

        {/* Established Year and College Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Affiliated University Name</label>
            <input
              type="text"
              name="affiliated_university"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter University Name"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">College Type</label>
            <select
              name="college_type"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
              <option value="Government">Government</option>
            </select>
          </div>
        </div>

        {/* Ranking and accreditation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-semibold">Ranking</label>
          <input
            type="number"
            name="ranking"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter ranking"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Accreditation</label>
          <input
            type="string"
            name="accreditation"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter accreditation"
          />
        </div>
       </div>

        {/* Highest and Average Package */}
        <h6 className=" font-semibold text-md mt-2 ">Placement Details</h6>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Highest Package</label>
            <input
              type="number"
              name="placement_details.highest_package"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter highest package"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Average Package</label>
            <input
              type="number"
              name="placement_details.avg_package"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter average package"
            />
          </div>
        </div>

        {/* Hostel Availability */}
        
        <div>
          <label className="block items-center">
            <input
              type="checkbox"
              name="hostel_availability"
              onChange={handleChange}
              className="form-checkbox"
            />
            <span className="ml-2 mb-1 font-semibold">Hostel Availability</span>
          </label>
        </div>

        <div classname = "grid grid-cols-2 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-semibold">Scholarship Details</label>
          <input
            type="text"
            name="scholarship_details"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter Scholarship Details"
          />
        </div>
        </div>

        {/* Phone and Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Phone</label>
            <input
              type="text"
              name="phone"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter phone number"
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
            />
          </div>
        </div>

        {/* {location} */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Latitude</label>
            <input
              type="text"
              name="latitude"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter Latitude"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Longitude</label>
            <input
              type="text"
              name="longitude"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter Longitude"
            />
          </div>
        </div>

        <div className = "grid grid-cols-1 md:grid-cols-3 gap-4">
         <div >
          <label className ="block mb-1 font-semibold">Image URL</label>
          <input
           type="text"
           name= "images"
           onChange= {handleChange}
           className = "w-full p-2 border rounded"
           placeholder = "Enter Image URL"
          />
         </div>
         <div>
          <lable className="block mb-1 font-semibold">Datasheet URL</lable>
          <input
          type="text"
          name= "datasheet_url"
          onChange = {handleChange}
          className = "w-full p-2 border rounded"
          placeholder = "Enter datasheet URL"
          />
         </div>
         <div>
           <label className= "block mb-1 font-semibold">Website URL</label>
           <input
           type="text"
           name="website_url"
           className="w-full p-2 border rounded"
           placeholder = "Enter Website Url"
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

export default AddCollege;
