import { FaSignInAlt, FaSignOutAlt, FaUser, FaUserPlus } from "react-icons/fa"; // Updated icons
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

import logoAnimation from "../assets/Animation.json";
import Lottie from "lottie-react";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const links = [
    <li key={1}>
      <NavLink
        className={({ isActive }) =>
          `font-playfair tracking-widest text-md transition-all duration-300 transform ${
            isActive
              ? "bg-navColor text-white"
              : "text-[#131313] hover:text-btnColor hover:scale-105 hover:underline"
          }`
        }
        to="/"
      >
        Home
      </NavLink>
    </li>,
    <li key={2}>
      <NavLink
        className={({ isActive }) =>
          `font-playfair tracking-widest text-md transition-all duration-300 transform ${
            isActive
              ? "bg-btnColor text-white"
              : "text-[#131313] hover:text-btnColor hover:scale-105 hover:underline"
          }`
        }
        to="/all-equipments"
      >
        All Equipments
      </NavLink>
    </li>,
    <li key={3}>
      <NavLink
        className={({ isActive }) =>
          `font-playfair tracking-widest text-md transition-all duration-300 transform ${
            isActive
              ? "bg-btnColor text-white"
              : "text-[#131313] hover:text-btnColor hover:scale-105 hover:underline"
          }`
        }
        to="/add-equipments"
      >
        Add Equipment
      </NavLink>
    </li>,
    <li key={4}>
      <NavLink
        className={({ isActive }) =>
          `font-playfair tracking-widest text-md transition-all duration-300 transform ${
            isActive
              ? "bg-btnColor text-white"
              : "text-[#131313] hover:text-btnColor hover:scale-105 hover:underline"
          }`
        }
        to="/my-equipments"
      >
        My Equipments
      </NavLink>
    </li>,
  ];

  return (
    <div className="navbar">
      <div className="w-full px-4 py-5">
        <div className="navbar-start">
          <Link
            to="/"
            className="font-merriweather tracking-widest leading-tight"
          >
            <div className="flex items-center gap-1 lg:gap-2">
              <div className="w-8 lg:w-12 h-8 lg:h-12">
                <Lottie animationData={logoAnimation} loop={true}></Lottie>
              </div>
              <div className="flex flex-row md:flex-col">
                <h2 className="text-xs lg:text-xl font-normal lg:font-extrabold text-navColor">
                  EquiSports
                </h2>
                <span className="hidden md:block text-xs lg:text-sm text-gray-500">
                  Official Store
                </span>
              </div>
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-5">{links}</ul>
        </div>
        <div className="navbar-end flex items-center gap-1 lg:gap-3">
          {user && user?.email ? (
            <div className="flex gap-3 items-center">
              {/* User Avatar or Icon */}
              <div className="relative group w-8 md:w-10 h-8 md:h-10">
                {user?.photoURL ? (
                  <img
                    className="w-full h-full object-cover rounded-full"
                    src={user.photoURL}
                    alt="User Avatar"
                  />
                ) : (
                  <FaUser className="w-10 h-10 rounded-full text-gray-500" />
                )}

                {/* Display Name on Hover */}
                <span className="absolute hidden group-hover:flex items-center justify-center top-9 left-0 text-navColor text-sm font-semibold rounded-lg px-2 py-1 bg-white shadow">
                  {user?.displayName}
                </span>
              </div>

              {/* Logout Button */}
              <div
                onClick={logOut}
                className="flex items-center gap-2 font-playfair tracking-widest px-2 md:px-3 py-2 bg-navColor text-white rounded-full cursor-pointer"
              >
                {/* Show 'Logout' text on larger screens */}
                <span className="hidden lg:inline">Logout</span>

                {/* Show logout icon on smaller screens */}
                <span className="lg:hidden text-md">
                  <FaSignOutAlt />
                </span>
              </div>
            </div>
          ) : (
            <>
              {/* Login Button */}
              <Link
                to="/auth/login"
                className="flex items-center gap-2 font-playfair tracking-widest px-3 py-2 bg-navColor text-white rounded-full cursor-pointer"
              >
                <FaSignInAlt className="text-xs lg:text-lg" />
                <h2 className="hidden lg:block">Login</h2>
              </Link>

              {/* Register Button */}
              <Link
                to="/auth/register"
                className="flex items-center gap-2 font-playfair tracking-widest px-3 py-2 bg-gray-200 text-navColor rounded-full cursor-pointer"
              >
                <FaUserPlus className="text-xs lg:text-lg" />
                <h2 className="hidden lg:block">Register</h2>
              </Link>
            </>
          )}

          {/* Dropdown for smaller screens */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#1B3466"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white z-[1] mt-3 w-52 p-4 shadow-lg text-white -right-6"
            >
              {links}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
