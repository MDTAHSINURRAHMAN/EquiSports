import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "../index.css";

const SwiperCarousel = () => {
    const barca = [
        {
          title: "“A Club Like No Other”",
          description: "Join FC Barcelona and be part of a legendary football family.",
          image: "https://i.ibb.co/KXkfMXH/mini-GP11364.webp",
        },
        {
          title: "“Data Fuels Victory”",
          description: "Dive into the stats and insights that power Barcelona’s success on the field.",
          image: "https://i.ibb.co/2q9MxgY/8C4A3498.webp",
        },
        {
          title: "“The Heartbeat of Champions”",
          description: "Ensure our athletes stay in top shape, ready to conquer the pitch.",
          image: "https://i.ibb.co/CwVRXrH/mini-03-MGA2804.webp",
        },
      ];
      

  return (
    <div className="w-full font-playfair">
      <style>
        {`
          .swiper-pagination-bullet {
            background-color: white;
            opacity: 0.6;
          }

          .swiper-pagination-bullet-active {
            background-color: white;
            opacity: 1;
          }

          .swiper-button-next,
          .swiper-button-prev {
            color: #1B3466;
          }

          .swiper-button-next:hover,
          .swiper-button-prev:hover {
            color: #1B3466;
          }
        `}
      </style>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000 }}
        loop={true}
      >
        {barca.map((lona, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center text-center bg-white shadow-md overflow-hidden">
              <img
                src={lona.image}
                alt={lona.title}
                className="w-full h-42 md:h-56 lg:h-64 xl:h-96 object-cover"
              />
              <div className="w-full  p-6">
                <h3 className="text-lg md:text-2xl text-navColor font-bold mb-2">
                  {lona.title}
                </h3>
                <p className="text-sm md:text-base text-navColor mb-4">
                  {lona.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperCarousel;
