import banner from "../../src/assets/image/pexels-usman-umar-340351639-29566108.jpg";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center bg-white pt-12">
      {/* Image Section */}
      <div className="flex-1">
        <img
          src={banner} // Replace with your image path
          alt="About Us"
          className="w-full max-h-[500px] object-cover shadow-lg"
        />
      </div>

      {/* Text Section */}
      <div className="font-merriweather flex-1 mt-6 md:mt-0 md:ml-12 text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
          About Us
        </h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
          At our core, we strive to inspire and empower individuals through
          sports.
        </p>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
          Whether you're just starting out or a seasoned professional, we're
          here to support your journey with top-notch gear and unparalleled
          dedication.
        </p>
        <button className="mt-6 px-6 py-3 bg-navColor text-white text-lg font-semibold rounded-lg shadow-md hover:bg-navColor/80 transition duration-300">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
