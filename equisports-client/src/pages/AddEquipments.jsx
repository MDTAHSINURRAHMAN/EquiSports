import { useContext } from "react";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import { AuthContext } from "../providers/AuthProvider";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

const AddEquipments = () => {
  const { user } = useContext(AuthContext); // Get the logged-in user's details

  const handleAddEquipment = (e) => {
    e.preventDefault();
    const form = e.target;
    const image = form.image.value;
    const itemName = form.itemName.value;
    const categoryName = form.categoryName.value;
    const description = form.description.value;
    const price = parseFloat(form.price.value);
    const rating = parseFloat(form.rating.value);
    const customization = form.customization.value;
    const processingTime = form.processingTime.value;
    const stockStatus = parseInt(form.stockStatus.value, 10);

    const userId = user?.uid; // Fetch the user ID dynamically

    if (!userId) {
      Swal.fire({
        icon: "error",
        title: "User not authenticated",
        text: "Please login to add equipment.",
      });
      return;
    }

    const newEquipment = {
      image,
      itemName,
      categoryName,
      description,
      price,
      rating,
      customization,
      processingTime,
      stockStatus,
      userId,
    };

    fetch("https://equis-sports-server-project.vercel.app/add-equipments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEquipment),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Equipment Added Successfully",
            text: "The new equipment has been added to the system.",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while adding the equipment.",
        });
      });

    form.reset();
  };

  return (
    <div>
      <Helmet>
        <title>EquiSports | Add Equipment</title>
      </Helmet>
      <Navbar></Navbar>
      <div className="font-merriweather min-h-screen bg-gray-100 flex justify-center items-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Add New Equipment
          </h2>
          <form
            onSubmit={handleAddEquipment}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Image */}
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
                placeholder="Enter image URL"
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
                placeholder="Enter item name"
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
                placeholder="Enter category name"
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
                placeholder="Enter item description"
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
                placeholder="Enter price"
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
                placeholder="Enter rating"
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
                placeholder="Enter customization options"
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
                placeholder="Enter delivery time"
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
                placeholder="Enter quantity in stock"
              />
            </div>

            {/* User Email */}
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
                value={user?.email || "N/A"} // Use dynamic value or fallback to "N/A"
                readOnly
              />
            </div>

            {/* User Name */}
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
                value={user?.displayName || "N/A"} // Use dynamic value or fallback to "N/A"
                readOnly
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-1 md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-navColor text-white rounded-lg font-bold tracking-wide shadow-md hover:bg-navColor/90 transition"
              >
                Add Equipment
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default AddEquipments;
