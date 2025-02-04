import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

const ViewDetails = () => {
  const { id } = useParams();
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch item details using the ID
    fetch(`https://equis-sports-server-project.vercel.app/add-equipments/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch equipment details.");
        }
        return response.json();
      })
      .then((data) => {
        setEquipment(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"></div>
          <p className="text-gray-600 mt-3">Loading details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center">
          <p className="text-red-600 font-bold">{error}</p>
          <Link
            to="/all-equipments"
            className="mt-4 px-4 py-2 bg-navColor text-white font-bold rounded-lg hover:bg-btnColor transition"
          >
            Back to All Equipments
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>EquiSports | Details</title>
      </Helmet>
      <Navbar />
      <div className="font-playfair min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-100 via-white to-blue-100 p-6">
        <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl overflow-hidden">
          {/* Image Section */}
          <div className="relative">
            <img
              src={equipment.image}
              alt={equipment.name}
              className="w-full h-96 object-cover"
            />
            <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-md text-sm">
              {equipment.category}
            </div>
          </div>

          {/* Details Section */}
          <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">
              {equipment.name}
            </h1>
            <p className="text-gray-600">{equipment.description}</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-700 font-semibold">Price:</p>
                <p className="text-gray-900 font-bold">${equipment.price}</p>
              </div>
              <div>
                <p className="text-gray-700 font-semibold">Rating:</p>
                <p className="text-yellow-400 font-bold">
                  {equipment.rating} out of 5
                </p>
              </div>
              <div>
                <p className="text-gray-700 font-semibold">Customization:</p>
                <p className="text-gray-900">{equipment.customization}</p>
              </div>
              <div>
                <p className="text-gray-700 font-semibold">Processing Time:</p>
                <p className="text-gray-900">{equipment.processingTime}</p>
              </div>
              <div>
                <p className="text-gray-700 font-semibold">Stock Status:</p>
                <p
                  className={`${
                    equipment.stockStatus > 0
                      ? "text-green-600"
                      : "text-red-600"
                  } font-bold`}
                >
                  {equipment.stockStatus > 0
                    ? `${equipment.stockStatus} items available`
                    : "Out of stock"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back to All Equipments Button */}
        <div className="mt-6">
          <Link
            to="/all-equipments"
            className="px-4 py-2 bg-navColor text-white font-bold rounded-lg hover:bg-btnColor transition"
          >
            Back to All Equipments
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewDetails;
