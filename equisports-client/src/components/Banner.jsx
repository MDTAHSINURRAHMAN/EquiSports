import banner from "../assets/image/banner2.png";

const Banner = () => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${banner})` }}
    >
    </div>
  );
};

export default Banner;
