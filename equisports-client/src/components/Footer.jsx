
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-navColor text-white font-merriweather">
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Website Name and About */}
          <div>
            <h2 className="text-xl font-bold">EquiSports Official Store</h2>
            <p className="mt-2 text-sm">
              Your one-stop shop for premium sports equipment and accessories.
              We provide high-quality products to elevate your game!
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-xl font-bold">Contact Us</h2>
            <ul className="mt-2 text-sm">
              <li>Email: support@equisports.com</li>
              <li>Phone: +1 (123) 456-7890</li>
              <li>Address: 123 Sports Ave, Sports City, SC 54321</li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h2 className="text-xl font-bold">Follow Us</h2>
            <div className="mt-2 flex justify-center space-x-4 text-lg">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <FaInstagram />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 text-center text-sm border-t border-gray-700 pt-4">
          © {new Date().getFullYear()} EquiSports Official Store. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
