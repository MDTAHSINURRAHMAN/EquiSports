import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import GiftsSection from "../components/GiftsSection";
import SwiperCarousel from "../components/SwiperCarousel";
import Footer from "../components/Footer";
import Products from "../components/Products";
import SportsCategory from "../components/SportsCategory";
import AboutUs from "../components/AboutUs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomeLayout = () => {
  return (
    <div>
      <Helmet>
        <title>EquiSports | Home</title>
      </Helmet>
      <nav>
        <Navbar></Navbar>
      </nav>
      <main>
        <ToastContainer></ToastContainer>
        <Banner></Banner>
        <AboutUs></AboutUs>
        <GiftsSection></GiftsSection>
        <SwiperCarousel></SwiperCarousel>
        <Products></Products>
        <SportsCategory></SportsCategory>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default HomeLayout;
