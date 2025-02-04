import { useEffect, useState } from "react";

const SportsCategory = () => {
  const [categories, setCategories] = useState([]);

  // Simulate fetching sports category data (replace with actual API if needed)
  useEffect(() => {
    const fetchCategories = async () => {
      // Simulating an API call with random data
      const data = [
        {
          id: 1,
          name: "Football",
          description: "Get the best football equipment, from balls to cleats.",
        },
        {
          id: 2,
          name: "Basketball",
          description: "Explore a wide range of basketball gear for all levels.",
        },
        {
          id: 3,
          name: "Tennis",
          description: "Find tennis rackets, balls, and accessories for the perfect game.",
        },
        {
          id: 4,
          name: "Swimming",
          description: "Dive into swimming with our top-quality gear.",
        },
        {
          id: 5,
          name: "Cycling",
          description: "Get cycling equipment that takes you further.",
        },
        {
          id: 6,
          name: "Golf",
          description: "Equip yourself with the best golf gear and accessories.",
        },
      ];

      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <div className="font-playfair min-h-screen  px-4 md:px-8 py-10">
      <h2 className="text-3xl font-bold text-center text-navColor mb-8">Sports Categories</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white border shadow-lg overflow-hidden transform transition-all hover:scale-105 duration-300"
          >
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h3>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <a
                href={`/category/${category.id}`}
                className="inline-block text-navColor font-medium hover:underline"
              >
                Explore
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SportsCategory;
