import { Link, useLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const AllEquipments = () => {
  const allEquipments = useLoaderData();
  const [sortedEquipments, setSortedEquipments] = useState(allEquipments); // Manage sorted data
  const [sortOrder, setSortOrder] = useState("asc"); // Track sort order

  const handleSort = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc"; // Toggle sort order
    const sorted = [...sortedEquipments].sort((a, b) => {
      return newSortOrder === "asc" ? a.price - b.price : b.price - a.price;
    });
    setSortedEquipments(sorted);
    setSortOrder(newSortOrder);
  };

  return (
    <div>
      <Helmet>
        <title>EquiSports | All Equipments</title>
      </Helmet>
      <Navbar></Navbar>
      <div className="min-h-screen bg-gray-100 font-merriweather">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-3xl font-bold text-gray-800">
              All Sports Equipments
            </h2>
            <button
              onClick={handleSort}
              className="px-1 lg:px-4 py-2 bg-navColor text-white text-xs lg:text-base shadow hover:bg-navColor/90 transition"
            >
              Sort by Price ({sortOrder === "asc" ? "Ascending" : "Descending"})
            </button>
          </div>
          <div className="hidden lg:block overflow-x-auto">
            {/* Table for larger screens */}
            <table className="min-w-full bg-white border-collapse border border-gray-300 shadow-lg">
              <thead>
                <tr className="bg-navColor text-white">
                  <th className="px-6 py-3 border border-gray-300">Serial No.</th>
                  <th className="px-6 py-3 border border-gray-300">Name</th>
                  <th className="px-6 py-3 border border-gray-300">Category</th>
                  <th className="px-6 py-3 border border-gray-300">Price ($)</th>
                  <th className="px-6 py-3 border border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedEquipments.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center">
                      No Data Found
                    </td>
                  </tr>
                ) : (
                  sortedEquipments.map((equipment, index) => (
                    <tr
                      key={equipment?._id}
                      className="hover:bg-gray-100 transition-colors"
                    >
                      <td className="px-6 py-4 border border-gray-300">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 border border-gray-300">
                        {equipment.itemName}
                      </td>
                      <td className="px-6 py-4 border border-gray-300">
                        {equipment.categoryName}
                      </td>
                      <td className="px-6 py-4 border border-gray-300">
                        ${equipment.price}
                      </td>
                      <td className="px-6 py-4 border border-gray-300 text-center">
                        <Link
                          to={`/view/${equipment._id}`}
                          className="px-4 py-2 bg-navColor text-white rounded-lg shadow hover:bg-btnColor transition"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="block lg:hidden">
            {/* Card format for smaller screens */}
            {sortedEquipments.length === 0 ? (
              <p className="text-center text-gray-600">No Data Found</p>
            ) : (
              <div className="grid gap-6">
                {sortedEquipments.map((equipment, index) => (
                  <div
                    key={equipment?._id}
                    className="bg-white border border-gray-300 shadow-lg rounded-lg p-4"
                  >
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      {index + 1}. {equipment.itemName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      <strong>Category:</strong> {equipment.categoryName}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Price:</strong> ${equipment.price}
                    </p>
                    <div className="mt-4">
                      <Link
                        to={`/view/${equipment._id}`}
                        className="px-4 py-2 bg-navColor text-white rounded-lg shadow hover:bg-btnColor transition"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default AllEquipments;
