import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loading from "./Loading";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const Update = () => {
  const { id } = useParams(); // Get the equipment ID from the URL
  const [equipment, setEquipment] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch the equipment data to be updated
  useEffect(() => {
    fetch(`https://equis-sports-server-project.vercel.app/add-equipments/${id}`)
      .then((res) => res.json())
      .then((data) => setEquipment(data))
      .catch((err) => setError("Failed to fetch equipment data"));
  }, [id]);

  // Handle the form submission for updating
  const handleUpdateEquipment = (e) => {
    e.preventDefault();

    const updatedEquipment = {
      itemName: e.target.itemName.value,
      categoryName: e.target.categoryName.value,
      description: e.target.description.value,
      price: parseFloat(e.target.price.value),
      rating: parseFloat(e.target.rating.value),
      customization: e.target.customization.value,
      processingTime: e.target.processingTime.value,
      stockStatus: parseInt(e.target.stockStatus.value),
      image: e.target.image.value,
    };

    fetch(
      `https://equis-sports-server-project.vercel.app/add-equipments/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEquipment),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          navigate(`/my-equipments`); // Redirect to "My Equipments" page after update

          toast.success("Equipment updated successfully!");
        } else {
          setError("Failed to update equipment.");
          toast.error("Failed to update equipment.");
        }
      })
      .catch((err) => toast.error("Failed to update equipment"));
  };

  if (!equipment) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <Helmet>
        <title>EquiSports | Update</title>
      </Helmet>
      <Navbar />
      <div className="font-merriweather min-h-screen bg-gray-100 flex justify-center items-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Update Equipment
          </h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form
            onSubmit={handleUpdateEquipment}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Image URL */}
            <div className="col-span-1">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="image"
              >
                Image URL
              </label>
              <input
                type="text"
                name="image"
                className="w-full border rounded-lg px-3 py-2 text-gray-700"
                defaultValue={equipment.image}
              />
            </div>

            {/* Item Name */}
            <div className="col-span-1">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="itemName"
              >
                Item Name
              </label>
              <input
                type="text"
                name="itemName"
                className="w-full border rounded-lg px-3 py-2 text-gray-700"
                defaultValue={equipment.itemName}
              />
            </div>

            {/* Category Name */}
            <div className="col-span-1">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="categoryName"
              >
                Category Name
              </label>
              <input
                type="text"
                name="categoryName"
                className="w-full border rounded-lg px-3 py-2 text-gray-700"
                defaultValue={equipment.categoryName}
              />
            </div>

            {/* Description */}
            <div className="col-span-1 md:col-span-2">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                name="description"
                className="w-full border rounded-lg px-3 py-2 text-gray-700"
                defaultValue={equipment.description}
                rows="4"
              ></textarea>
            </div>

            {/* Price */}
            <div className="col-span-1">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="price"
              >
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                className="w-full border rounded-lg px-3 py-2 text-gray-700"
                defaultValue={equipment.price}
              />
            </div>

            {/* Rating */}
            <div className="col-span-1">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="rating"
              >
                Rating (out of 5)
              </label>
              <input
                type="number"
                step="0.1"
                max="5"
                name="rating"
                className="w-full border rounded-lg px-3 py-2 text-gray-700"
                defaultValue={equipment.rating}
              />
            </div>

            {/* Customization */}
            <div className="col-span-1">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="customization"
              >
                Customization
              </label>
              <input
                type="text"
                name="customization"
                className="w-full border rounded-lg px-3 py-2 text-gray-700"
                defaultValue={equipment.customization}
              />
            </div>

            {/* Processing Time */}
            <div className="col-span-1">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="processingTime"
              >
                Processing Time
              </label>
              <input
                type="text"
                name="processingTime"
                className="w-full border rounded-lg px-3 py-2 text-gray-700"
                defaultValue={equipment.processingTime}
              />
            </div>

            {/* Stock Status */}
            <div className="col-span-1">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="stockStatus"
              >
                Stock Status
              </label>
              <input
                type="number"
                name="stockStatus"
                className="w-full border rounded-lg px-3 py-2 text-gray-700"
                defaultValue={equipment.stockStatus}
              />
            </div>

            {/* User Email (Read-Only) */}
            <div className="col-span-1">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="userEmail"
              >
                User Email
              </label>
              <input
                type="email"
                name="userEmail"
                className="w-full border rounded-lg px-3 py-2 text-gray-500 bg-gray-100"
                value={equipment.userEmail}
                readOnly
              />
            </div>

            {/* User Name (Read-Only) */}
            <div className="col-span-1">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="userName"
              >
                User Name
              </label>
              <input
                type="text"
                name="userName"
                className="w-full border rounded-lg px-3 py-2 text-gray-500 bg-gray-100"
                value={equipment.userName}
                readOnly
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-1 md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-navColor text-white rounded-lg font-bold tracking-wide shadow-md hover:bg-navColor/90 transition"
              >
                Update Equipment
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Update;
