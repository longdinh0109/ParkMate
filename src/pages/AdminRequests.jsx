import { useState, useEffect } from "react";
import AdminLayout from "../layouts/AdminLayout";
import partnerApi from "../api/partnerApi";
import parkingLotApi from "../api/parkingLotApi";

export default function AdminRequests() {
  const [activeTab, setActiveTab] = useState("partner"); // partner | parkingLot
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res;
        if (activeTab === "partner") {
          res = await partnerApi.getRequests(); // API cho partner requests
        } else {
          res = await parkingLotApi.getRequests(); // API cho parking lot requests
        }
        setRequests(res.data || []);
      } catch (err) {
        console.error("❌ Error fetching requests:", err);
      }
    };
    fetchData();
  }, [activeTab]);

  // Filter
  const filtered = requests.filter((r) => {
    const matchSearch =
      r.partnerName?.toLowerCase().includes(search.toLowerCase()) ||
      r.email?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = status ? r.status === status : true;
    return matchSearch && matchStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filtered.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filtered.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <AdminLayout>
      {/* Tabs */}
      <div className="flex gap-6 border-b mb-6">
        <button
          className={`pb-2 ${
            activeTab === "partner"
              ? "border-b-2 border-indigo-600 font-semibold"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("partner")}
        >
          Partner Account Requests
        </button>
        <button
          className={`pb-2 ${
            activeTab === "parkingLot"
              ? "border-b-2 border-indigo-600 font-semibold"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("parkingLot")}
        >
          Parking Lot Requests
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center mb-4">
        <input
          type="text"
          placeholder="Search by Partner or Email..."
          className="border px-3 py-2 rounded-md w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border px-3 py-2 rounded-md"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <input
          type="date"
          className="border px-3 py-2 rounded-md"
        />
        <select className="border px-3 py-2 rounded-md">
          <option>Sort by Date</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              {activeTab === "partner" ? (
                <>
                  <th className="px-4 py-2">Partner</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Company</th>
                  <th className="px-4 py-2">Phone</th>
                  <th className="px-4 py-2">Submitted At</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Actions</th>
                </>
              ) : (
                <>
                  <th className="px-4 py-2">Partner</th>
                  <th className="px-4 py-2">Parking Lot</th>
                  <th className="px-4 py-2">Location</th>
                  <th className="px-4 py-2">Spaces</th>
                  <th className="px-4 py-2">Submitted At</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Actions</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((r, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50 transition">
                  {activeTab === "partner" ? (
                    <>
                      <td className="px-4 py-2">{r.partnerName}</td>
                      <td className="px-4 py-2">{r.email}</td>
                      <td className="px-4 py-2">{r.companyName}</td>
                      <td className="px-4 py-2">{r.phone}</td>
                      <td className="px-4 py-2">
                        {new Date(r.submittedAt).toLocaleDateString("en-GB")}
                      </td>
                      <td
                        className={`px-4 py-2 font-semibold ${
                          r.status === "Pending"
                            ? "text-yellow-600"
                            : r.status === "Approved"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {r.status}
                      </td>
                      <td className="px-4 py-2 flex gap-2">
                        {r.status === "Pending" && (
                          <>
                            <button className="text-green-600 hover:underline">
                              Approve
                            </button>
                            <button className="text-red-600 hover:underline">
                              Reject
                            </button>
                          </>
                        )}
                        <button className="text-indigo-600 hover:underline">
                          View
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-2">{r.partnerName}</td>
                      <td className="px-4 py-2">{r.lotName}</td>
                      <td className="px-4 py-2">{r.city}</td>
                      <td className="px-4 py-2">{r.spaces}</td>
                      <td className="px-4 py-2">
                        {new Date(r.submittedAt).toLocaleDateString("en-GB")}
                      </td>
                      <td
                        className={`px-4 py-2 font-semibold ${
                          r.status === "Pending"
                            ? "text-yellow-600"
                            : r.status === "Approved"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {r.status}
                      </td>
                      <td className="px-4 py-2 flex gap-2">
                        {r.status === "Pending" && (
                          <>
                            <button className="text-green-600 hover:underline">
                              Approve
                            </button>
                            <button className="text-red-600 hover:underline">
                              Reject
                            </button>
                          </>
                        )}
                        <button className="text-indigo-600 hover:underline">
                          View
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={activeTab === "partner" ? 7 : 7}
                  className="px-4 py-4 text-center text-gray-500"
                >
                  No requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center gap-2 mt-4">
          <button
            className="px-3 py-1 border rounded-md hover:bg-gray-100 disabled:opacity-50"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => handlePageChange(idx + 1)}
              className={`px-3 py-1 border rounded-md ${
                currentPage === idx + 1
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 border rounded-md hover:bg-gray-100 disabled:opacity-50"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </AdminLayout>
  );
}
