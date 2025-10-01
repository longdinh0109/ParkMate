import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import ConfirmEmail from "./ConfirmEmail";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    lots: "",
    tax: "",
  });
  const [errors, setErrors] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!form.email) newErrors.email = "Email is required";
    if (!form.company) newErrors.company = "Company name is required";
    if (!form.password) newErrors.password = "Password is required";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!form.phone) newErrors.phone = "Phone number is required";
    if (!form.address) newErrors.address = "Address is required";

    setErrors(newErrors);

    // Nếu không có lỗi => mở popup ConfirmEmail
    if (Object.keys(newErrors).length === 0) {
      console.log("✅ Form valid, call API register here...");
      setShowConfirm(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-indigo-100">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mb-3">
            <span className="text-white text-xl font-bold">P</span>
          </div>
          <h2 className="text-xl font-semibold">Parking Partner</h2>
          <p className="text-sm text-gray-500">Partner Registration</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email address"
              className={`w-full border px-4 py-2 rounded-md focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-indigo-400"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Company */}
          <div>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Company Name"
              className={`w-full border px-4 py-2 rounded-md focus:ring-2 ${
                errors.company
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-indigo-400"
              }`}
            />
            {errors.company && (
              <p className="text-red-500 text-sm">{errors.company}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className={`w-full border px-4 py-2 rounded-md focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-indigo-400"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className={`w-full border px-4 py-2 rounded-md focus:ring-2 ${
                errors.phone
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-indigo-400"
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className={`w-full border px-4 py-2 rounded-md focus:ring-2 ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-indigo-400"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
              className={`w-full border px-4 py-2 rounded-md focus:ring-2 ${
                errors.address
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-indigo-400"
              }`}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>

          {/* Parking lots */}
          <input
            type="number"
            name="lots"
            value={form.lots}
            onChange={handleChange}
            placeholder="Number of parking lots"
            className="col-span-1 border px-4 py-2 rounded-md focus:ring-2 focus:ring-indigo-400"
          />

          {/* Tax ID */}
          <input
            type="text"
            name="tax"
            value={form.tax}
            onChange={handleChange}
            placeholder="Tax ID"
            className="col-span-1 border px-4 py-2 rounded-md focus:ring-2 focus:ring-indigo-400"
          />

          {/* Upload */}
          <div className="col-span-2 border-2 border-dashed rounded-md flex items-center justify-center py-6 text-gray-500 cursor-pointer">
            Upload Business License
          </div>
          <div className="col-span-2 border-2 border-dashed rounded-md flex items-center justify-center py-6 text-gray-400 cursor-pointer">
            Upload Logo (Optional)
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex justify-between mt-4">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
            >
              Register
            </button>
            <Link
              to="/login"
              className="px-6 py-2 border rounded-md hover:bg-gray-100"
            >
              Cancel
            </Link>
          </div>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Log in here
          </Link>
        </p>
      </div>

      {/* ✅ Popup ConfirmEmail */}
      <Modal isOpen={showConfirm} onClose={() => setShowConfirm(false)}>
        <ConfirmEmail email={form.email} />
      </Modal>
    </div>
  );
}
