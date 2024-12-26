"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { use } from "react"; // Import use() to unwrap the params Promise
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EditDepartment = ({ params }) => {
  const router = useRouter();

  // Unwrap params using React.use()
  const { id } = use(params); // Use `use()` to unwrap the `params` Promise

  const [formData, setFormData] = useState({
    name: "",
    short_name: "",
    description: "",
  });

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await fetch(`${BASE_URL}/Departments/Departments/${id}`);
        const result = await response.json();

        if (result.status && result.data) {
          setFormData(result.data);
        } else {
          console.error("Failed to fetch Department data:", result);
        }
      } catch (error) {
        console.error("Error fetching Department data:", error);
      }
    };

    fetchDepartment();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/Departments/Departments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Department updated successfully!");
        router.push("/Admin/list-of-Departments"); // Redirect to list of Departments
      } else {
        const error = await response.json();
        alert(`Failed to update: ${error.message}`);
      }
    } catch (error) {
      console.error("Error updating Department:", error);
    }
  };

  return (
    <div className="container p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4 text-start">Edit Department</h1>
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

export default EditDepartment;
