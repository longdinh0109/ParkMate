import React, { useState } from "react";
import PartnerLayout from "../layouts/MainLayout";
import parkingLotApi from "../api/parkingLotApi";   // ✅ import default
import Modal from "../components/Modal";
import AddRuleModal from "../components/AddRuleModal";
import RuleDetailModal from "../components/RuleDetailModal";

export default function RegisterLot() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    capacity: "",
    images: null,
    license: null,
    layout: null,
  });

  const [rules, setRules] = useState([]);
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [selectedRule, setSelectedRule] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleAddRule = (rule) => {
    setRules([...rules, rule]);
  };

  const handleRemoveRule = (index) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, rules };
    console.log("📤 Submit payload:", payload);

    try {
      const res = await parkingLotApi.registerParkingLot(payload); // ✅ call API đúng
      alert("Parking Lot registered successfully!");
      console.log("✅ Response:", res.data);
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Failed to register parking lot");
    }
  };

  return (
    <PartnerLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">Register New Parking Lot</h1>
        <p className="text-gray-500 mb-6">
          Cung cấp thông tin đầy đủ để đăng ký bãi đậu xe mới.
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Basic Information */}
          <div className="lg:col-span-1 bg-white p-6 shadow rounded-lg space-y-4">
            <h2 className="text-lg font-semibold mb-2">Basic Information</h2>
            <input
              type="text"
              name="name"
              placeholder="Parking Lot Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md"
            />
            <input
              type="number"
              name="capacity"
              placeholder="Total Capacity"
              value={form.capacity}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md"
            />
          </div>

          {/* Pricing Rules */}
          <div className="lg:col-span-2 bg-white p-6 shadow rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Pricing Rules</h2>
              <button
                type="button"
                onClick={() => setShowRuleModal(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                + Add Rule
              </button>
            </div>

            {rules.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg text-sm">
                  <thead className="bg-gray-100 text-gray-700 text-center">
                    <tr>
                      <th className="px-3 py-2 border">Vehicle Type</th>
                      <th className="px-3 py-2 border">Base Rate (VND)</th>
                      <th className="px-3 py-2 border">Free Minutes</th>
                      <th className="px-3 py-2 border">Valid From</th>
                      <th className="px-3 py-2 border w-32">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rules.map((rule, index) => (
                      <tr key={index} className="text-center hover:bg-gray-50">
                        <td className="border px-3 py-2">{rule.vehicleType}</td>
                        <td className="border px-3 py-2">{rule.baseRate}</td>
                        <td className="border px-3 py-2">{rule.freeMinutes}</td>
                        <td className="border px-3 py-2">{rule.validFrom}</td>
                        <td className="border px-3 py-2 flex justify-center gap-3">
                          <button
                            type="button"
                            onClick={() => setSelectedRule(rule)}
                            className="text-indigo-600 hover:underline"
                          >
                            View Detail
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveRule(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            🗑
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-sm italic mt-2">No pricing rules added yet.</p>
            )}
          </div>

          {/* Upload Section */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="border-2 border-dashed p-6 text-center text-gray-500 rounded">
              <p>Upload Parking Lot Images</p>
              <input type="file" name="images" onChange={handleChange} className="mt-2" />
            </div>
            <div className="border-2 border-dashed p-6 text-center text-gray-500 rounded">
              <p>Upload Business License</p>
              <input type="file" name="license" onChange={handleChange} className="mt-2" />
            </div>
            <div className="border-2 border-dashed p-6 text-center text-gray-500 rounded">
              <p>Upload 3D Layout (Optional)</p>
              <input type="file" name="layout" onChange={handleChange} className="mt-2" />
            </div>
          </div>

          {/* Buttons */}
          <div className="lg:col-span-3 flex justify-end gap-4 mt-6">
            <button
              type="button"
              className="px-6 py-2 border rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
            >
              Submit Registration
            </button>
          </div>
        </form>
      </div>

      {/* Modal Add Rule */}
      <Modal isOpen={showRuleModal} onClose={() => setShowRuleModal(false)}>
        <AddRuleModal onSave={handleAddRule} onClose={() => setShowRuleModal(false)} />
      </Modal>

      {/* Modal View Detail Rule */}
      <RuleDetailModal rule={selectedRule} onClose={() => setSelectedRule(null)} />
    </PartnerLayout>
  );
}
