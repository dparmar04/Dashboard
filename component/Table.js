"use client";
import { useState } from "react";
import mockData from "../utils/mockData";
import { FiChevronUp, FiChevronDown } from "react-icons/fi"; // Import icons

export default function Table() {
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Filter and sort data
  const filteredData = mockData
    .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => (sortOrder === "asc" ? a.id - b.id : b.id - a.id));

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const displayedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="p-4 bg-blue-50">
      <div className="flex gap-10">
        <input
          type="text"
          placeholder="Search..."
          className="p-3 bg-blue-100 flex-1/2 rounded mb-4 w-full outline-none placeholder-gray-500 text-black"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-blue-600 flex-1/2 md:flex-1 cursor-pointer rounded-lg text-white px-4 py-2 mb-4"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          Sort By Order ({sortOrder === "asc" ? "↑" : "↓"})
        </button>
      </div>

      <table className="w-full border border-black">
        <thead>
          <tr className="bg-gray-600 text-white">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map((item) => (
            <tr key={item.id} className="border border-black text-center">
              <td className="border border-black text-black p-2">{item.id}</td>
              <td className="border text-black p-2">{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        {/* Previous Button */}
        <button
          className="px-3 py-1 bg-gray-700 text-white rounded disabled:bg-gray-400"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`px-3 py-1 rounded border transition-all duration-200 ${currentPage === index + 1
              ? "bg-blue-600 text-white"
              : "bg-white text-black hover:bg-gray-300"
              }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        {/* Next Button */}
        <button
          className="px-3 py-1 bg-gray-700 text-white rounded disabled:bg-gray-400"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
