"use client"; // For Next.js app directory support

import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserRegisterLogin() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    pincode: "",
    course: "",
    enrollmentYear: "",
    role: "",
  });

  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and register form
  const [isClient, setIsClient] = useState(false);

  // Use useEffect to set the client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log the form data to ensure it's correct
    console.log("Form Data being sent:", formData);

    // Determine the API endpoint based on action (login/register) for user
    let apiEndpoint = "";

    if (isLogin) {
      apiEndpoint = "https://college-portal-backend-y8d9.onrender.com/api/user/login";
    } else {
      apiEndpoint = "https://college-portal-backend-y8d9.onrender.com/api/user/register";
    }

    console.log("API Endpoint:", apiEndpoint);

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.text(); // Use text() to capture the HTML response

      // Check if response is JSON, if not log the response as HTML
      try {
        const parsedResult = JSON.parse(result);
        if (response.ok) {
          if (isLogin) {
            const { token } = parsedResult;
            localStorage.setItem("authToken", token);
            toast.success("Login successful!", {
              position: "top-right",
              autoClose: 3000,
            });
          } else {
            toast.success("Registration successful! Please log in.", {
              position: "top-right",
              autoClose: 3000,
            });
          }
        } else {
          toast.error(parsedResult.message || "Error during authentication.", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      } catch (error) {
        console.error("Error parsing response as JSON:", error);
        toast.error("Received an unexpected response. It might be an error page.", {
          position: "top-right",
          autoClose: 3000,
        });
        console.error("HTML Response:", result); // Log HTML response
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      toast.error("An error occurred during the process.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="container p-8 w-full sm:w-[450px] md:w-[500px] lg:w-[600px] bg-white shadow-xl rounded-lg">
        {/* Only render ToastContainer after the component has mounted on the client */}
        {isClient && <ToastContainer />}
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          User {isLogin ? "Login" : "Register"}
        </h1>

        {/* Toggle between login and registration forms */}
        <div className="text-center mb-4">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:underline"
          >
            {isLogin
              ? "Don't have an account? Register here."
              : "Already have an account? Login here."}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Only show "Name" and other registration fields for register form */}
          {!isLogin && (
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter full name"
                required
              />
            </div>
          )}

          {/* Email Field */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter email"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter password"
              required
            />
          </div>

          {/* Mobile and Role Fields inside the same div */}
          {!isLogin && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1 font-semibold text-gray-700">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter mobile number"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-gray-700">Role</label>
                <select
                  name="role"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div>
          )}

          {/* Additional fields for registration */}
          {!isLogin && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-semibold text-gray-700">Course</label>
                  <input
                    type="text"
                    name="course"
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter course"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-gray-700">Enrollment Year</label>
                  <input
                    type="number"
                    name="enrollmentYear"
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter enrollment year"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-semibold text-gray-700">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter pincode"
                />
              </div>
            </>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserRegisterLogin;
