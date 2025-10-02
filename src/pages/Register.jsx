import React, { useState } from "react";
import { Link } from "react-router-dom";
import partnerApi from "../api/partnerApi";

export default function Register() {
  const [form, setForm] = useState({
    companyName: "",
    companyEmail: "",
    password: "",
    confirmPassword: "",
    taxNumber: "",
    businessLicenseNumber: "",
    companyPhone: "",
    companyAddress: "",
    businessDescription: "",
    contactPersonName: "",
    contactPersonPhone: "",
    contactPersonEmail: "",
  });

  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [errors, setErrors] = useState({});

  // --- handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // --- handle file upload + preview
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setFilePreview(URL.createObjectURL(uploadedFile));
    }
  };

  // --- validate form
  const validate = () => {
    let newErrors = {};
    if (!form.companyName) newErrors.companyName = "Company name is required";
    if (!form.companyEmail) newErrors.companyEmail = "Company email is required";
    if (!form.password) newErrors.password = "Password is required";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!form.taxNumber) newErrors.taxNumber = "Tax number is required";
    if (!form.businessLicenseNumber)
      newErrors.businessLicenseNumber = "Business license number is required";
    if (!form.companyPhone) newErrors.companyPhone = "Phone number is required";
    if (!form.companyAddress) newErrors.companyAddress = "Address is required";
    if (!form.businessDescription)
      newErrors.businessDescription = "Description is required";
    if (!form.contactPersonName)
      newErrors.contactPersonName = "Contact person name is required";
    if (!form.contactPersonPhone)
      newErrors.contactPersonPhone = "Contact person phone is required";
    if (!form.contactPersonEmail)
      newErrors.contactPersonEmail = "Contact person email is required";
    if (!file) newErrors.file = "Business license file is required";

    return newErrors;
  };

  // --- submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        // chuẩn bị formData gửi API
        const formData = new FormData();
        Object.keys(form).forEach((key) => {
          formData.append(key, form[key]);
        });
        formData.append("businessLicenseFile", file);

        await partnerApi.register(formData);

        alert("Register success!");
      } catch (err) {
        console.error("Register failed", err);
        alert("Register failed!");
      }
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
          <input
            type="text"
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            placeholder="Company Name"
            className="col-span-2 border px-4 py-2 rounded-md"
          />
          {errors.companyName && (
            <p className="col-span-2 text-red-500 text-sm">{errors.companyName}</p>
          )}

          <input
            type="email"
            name="companyEmail"
            value={form.companyEmail}
            onChange={handleChange}
            placeholder="Company Email"
            className="border px-4 py-2 rounded-md"
          />
          <input
            type="text"
            name="taxNumber"
            value={form.taxNumber}
            onChange={handleChange}
            placeholder="Tax Number"
            className="border px-4 py-2 rounded-md"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="border px-4 py-2 rounded-md"
          />
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="border px-4 py-2 rounded-md"
          />
          
          <input
            type="text"
            name="businessLicenseNumber"
            value={form.businessLicenseNumber}
            onChange={handleChange}
            placeholder="Business License Number"
            className="border px-4 py-2 rounded-md"
          />

          <input
            type="text"
            name="companyPhone"
            value={form.companyPhone}
            onChange={handleChange}
            placeholder="Company Phone"
            className="border px-4 py-2 rounded-md"
          />
          <input
            type="text"
            name="companyAddress"
            value={form.companyAddress}
            onChange={handleChange}
            placeholder="Company Address"
            className="border px-4 py-2 rounded-md"
          />

          <textarea
            name="businessDescription"
            value={form.businessDescription}
            onChange={handleChange}
            placeholder="Business Description"
            className="col-span-2 border px-4 py-2 rounded-md"
          />

          <input
            type="text"
            name="contactPersonName"
            value={form.contactPersonName}
            onChange={handleChange}
            placeholder="Contact Person Name"
            className="border px-4 py-2 rounded-md"
          />
          <input
            type="text"
            name="contactPersonPhone"
            value={form.contactPersonPhone}
            onChange={handleChange}
            placeholder="Contact Person Phone"
            className="border px-4 py-2 rounded-md"
          />
          <input
            type="email"
            name="contactPersonEmail"
            value={form.contactPersonEmail}
            onChange={handleChange}
            placeholder="Contact Person Email"
            className="col-span-2 border px-4 py-2 rounded-md"
          />

          {/* Upload file dưới cùng */}
          <div className="col-span-2 mt-4">
            <label className="block text-sm font-medium mb-2">Business License File *</label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className="w-full border px-4 py-2 rounded-md"
            />
            {errors.file && <p className="text-red-500 text-sm">{errors.file}</p>}
            {filePreview && (
              <div className="mt-3">
                <p className="text-sm text-gray-500">Preview:</p>
                <img
                  src={filePreview}
                  alt="preview"
                  className="h-40 object-contain border rounded-md mt-2"
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex justify-between mt-6">
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
      </div>
    </div>
  );
}
