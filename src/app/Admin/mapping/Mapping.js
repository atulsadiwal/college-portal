"use client";

import { useState, useEffect } from "react";

export default function Mapping() {
  const [fields, setFields] = useState({
    field1: [],
    field2: [],
    field3: [],
    field4: [],
    field5: [],
    field6: [],
  });

  const [selectedValues, setSelectedValues] = useState({
    field1: "",
    field2: "",
    field3: "",
    field4: "",
    field5: "",
    field6: "",
  });

  useEffect(() => {
    const fetchFieldData = async (fieldName, url) => {
      try {
        const response = await fetch(url);
        const { status, data } = await response.json();

        if (status && Array.isArray(data)) {
          setFields((prev) => ({ ...prev, [fieldName]: data }));
        } else {
          console.error(`Unexpected response for ${fieldName}:`, data);
          setFields((prev) => ({ ...prev, [fieldName]: [] }));
        }
      } catch (error) {
        console.error(`Error fetching data for ${fieldName}:`, error);
        setFields((prev) => ({ ...prev, [fieldName]: [] })); // Set as an empty array on error
      }
    };

    fetchFieldData(
      "field1",
      "https://college-portal-backend-y8d9.onrender.com/api/college/all-colleges"
    );
    fetchFieldData(
      "field2",
      "https://college-portal-backend-y8d9.onrender.com/api/departments/all-departments"
    );
    fetchFieldData(
      "field3",
      "https://college-portal-backend-y8d9.onrender.com/api/accommodation/all-accommodations"
    );
    fetchFieldData(
      "field4",
      "https://college-portal-backend-y8d9.onrender.com/api/program/all-programs"
    );
    fetchFieldData(
      "field5",
      "https://college-portal-backend-y8d9.onrender.com/api/stream/all-streams"
    );
    fetchFieldData(
      "field6",
      "https://college-portal-backend-y8d9.onrender.com/api/affiliation/all-affiliation"
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected IDs:", selectedValues);
  };

  return (
    <div className="w-full mx-auto mt-10 p-4 border rounded shadow-md bg-white">
      <h1 className="text-xl font-bold mb-4">Form with Select Fields</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(fields).map((fieldKey, index) => (
          <div key={index} className="mb-4">
            <label
              htmlFor={fieldKey}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select {fieldKey.charAt(0).toUpperCase() + fieldKey.slice(1)}
            </label>
            <select
              id={fieldKey}
              name={fieldKey}
              value={selectedValues[fieldKey]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select an option</option>
              {(fields[fieldKey] || []).map((option) => (
                <option key={option._id} value={option._id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
