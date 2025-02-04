import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Fade, Zoom } from "react-awesome-reveal";

const GiftsSection = () => {
  const [gifts, setGifts] = useState([]);

  useEffect(() => {
    // Fetch the gifts data (replace with your JSON endpoint or local file path)
    fetch("./gifts.json")
      .then((response) => response.json())
      .then((data) => setGifts(data))
      .catch(() => {
        toast.error("Error fetching gifts. Please try again later.");
      });
  }, []);

  return (
    <section className="py-5 font-merriweather">
      <div className="px-2 py-10 text-center">
        {/* Title and Subtitle */}
        <Fade direction="up" cascade damping={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-600 mb-2">
            Exclusive Sports Gifts
          </h2>
          <p className="text-xl text-white opacity-80 mb-5">
            Discover our curated collection of premium sports gifts for every fan
            and athlete.
          </p>
        </Fade>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {gifts.map((gift) => (
            <Zoom key={gift.id}>
              <div
                className="relative group w-full h-64 bg-cover bg-center rounded-md shadow-lg overflow-hidden"
                style={{ backgroundImage: `url(${gift.image})` }}
              >
                {/* Name Overlay */}
                <div className="absolute bottom-0 pb-1 w-full text-white text-xl font-bold tracking-widest">
                  {gift.name}
                </div>
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Zoom>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GiftsSection;
