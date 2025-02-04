import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../pages/Loading";

const Products = () => {
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch equipment data from the backend API
  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await fetch(
          "https://equis-sports-server-project.vercel.app/add-equipments"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch equipment data");
        }
        const data = await response.json();
        setEquipments(data); // Set equipments data from the backend
      } catch (error) {
        toast.error("Error fetching equipments. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchEquipments();
  }, []);

  return (
    <div className="font-playfair min-h-screen px-4 md:px-8 py-10">
      <h2 className="text-3xl font-bold text-navColor text-center my-8">
        Our Equipment
      </h2>

      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {equipments.slice(0, 6).map((equipment) => (
            <div
              key={equipment._id}
              className="border p-4 bg-white shadow-md hover:shadow-lg transition duration-300 rounded-lg p-5"
            >
              <img
                src={equipment.image} // Assuming the equipment has an image URL
                alt={equipment.name}
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-[#131313] text-xl font-semibold mb-2">
                Product Name: {equipment.itemName}
              </h3>

              {/* Description */}
              <p className="text-[#131313] mb-2">
                Product Description: {equipment.description}
              </p>

              {/* Price */}
              <p className="text-[#131313] font-semibold mb-2">
                <span className="font-medium">Price: </span>
                {equipment.price}
              </p>

              {/* Rating */}
              <p className="text-[#131313] font-semibold mb-4">
                <span className="font-medium">Rating: </span>
                {equipment.rating}
              </p>

              <Link
                to={`/`} // Link to equipment details page
                className="text-white font-bold p-2 bg-navColor rounded-lg hover:underline"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
