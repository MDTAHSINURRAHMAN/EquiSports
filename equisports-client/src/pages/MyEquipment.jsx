import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

const MyEquipment = () => {
  const { user } = useContext(AuthContext); // Assuming `user` contains the logged-in user's information
  const [equipments, setEquipments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.uid) {
      fetch(
        `https://equis-sports-server-project.vercel.app/my-equipments/${user.uid}`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch equipment");
          }
          return res.json();
        })
        .then((data) => setEquipments(data))
        .catch((err) => {
          setError(err.message);
          Swal.fire("Error", err.message, "error"); // SweetAlert2 error notification
        });
    }
  }, [user?.uid]);

  const handleDelete = async (id) => {
    const confirmDeletion = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirmDeletion.isConfirmed) return; // Exit if the user cancels the deletion

    try {
      const response = await fetch(
        `https://equis-sports-server-project.vercel.app/add-equipments/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok) {
        Swal.fire("Deleted!", "Your equipment has been deleted.", "success");
        // Remove the deleted equipment from the state
        setEquipments((prevEquipments) =>
          prevEquipments.filter((equipment) => equipment._id !== id)
        );
      } else {
        setError(data.message || "Failed to delete equipment.");
        Swal.fire(
          "Error",
          data.message || "Failed to delete equipment.",
          "error"
        );
      }
    } catch (error) {
      setError("An error occurred while deleting equipment.");
      Swal.fire(
        "Error",
        "An error occurred while deleting equipment.",
        "error"
      );
    }
  };

  return (
    <div>
      <Helmet>
        <title>EquiSports | My Equipments</title>
      </Helmet>
      <Navbar></Navbar>
      <div className="min-h-screen bg-gray-100 font-merriweather">
        <div className="container mx-auto p-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 my-6">
            My Sports Equipments
          </h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {equipments.length === 0 ? (
            <p className="text-gray-700 text-center">
              No equipment found. Add some equipment to see them here.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {equipments.map((equipment) => (
                <div
                  key={equipment._id}
                  className="card bg-white border border-gray-300 shadow-lg hover:shadow-xl transition-shadow rounded-lg"
                >
                  <img
                    src={equipment.image}
                    alt={equipment.itemName}
                    className="h-48 w-full object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {equipment.itemName}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {equipment.description}
                    </p>
                    <div className="text-gray-700">
                      <p>
                        <strong>Category:</strong> {equipment.categoryName}
                      </p>
                      <p>
                        <strong>Price:</strong> ${equipment.price.toFixed(2)}
                      </p>
                      <p>
                        <strong>Rating:</strong> {equipment.rating} / 5
                      </p>
                      <p>
                        <strong>Stock:</strong> {equipment.stockStatus}{" "}
                        available
                      </p>
                      <p>
                        <strong>Processing Time:</strong>{" "}
                        {equipment.processingTime}
                      </p>
                    </div>
                    <div className="flex text-center gap-4 mt-4">
                      <Link
                        to={`/my-equipments/update/${equipment._id}`}
                        className="flex-1 bg-navColor text-white py-2 px-4 rounded-lg hover:bg-navColor/90 transition"
                      >
                        Update
                      </Link>
                      <Link
                        onClick={() => handleDelete(equipment._id)}
                        className="flex-1 bg-btnColor text-white py-2 px-4 rounded-lg hover:bg-btnColor/90 transition"
                      >
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MyEquipment;
