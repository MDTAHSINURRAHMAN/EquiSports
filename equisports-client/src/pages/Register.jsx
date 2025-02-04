import Navbar from "../components/Navbar";
import logo from "../assets/barcelona.png";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const { createUser, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // State to handle password validation error
  const [passwordError, setPasswordError] = useState("");

  // Password validation function
  const validatePassword = (password) => {
    // Regular expression to check for uppercase, lowercase, and length of at least 6 characters
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Validate password
    if (!validatePassword(password)) {
      setPasswordError(
        "Password must contain at least 6 characters, one uppercase letter, and one lowercase letter."
      );
      toast.error("Password does not meet the required criteria.");
      return; // Stop form submission if password is invalid
    } else {
      setPasswordError(""); // Clear the error if password is valid
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;

        // Update the user profile
        updateProfile(user, {
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo }); // Update local state
            toast.success("User Created and Profile Updated Successfully");
            navigate("/");
          })
          .catch((err) => {
            toast.error("Error updating profile.");
          });

        const createdAt = user.metadata.creationTime;

        // New user object with the Firebase UID
        const newUser = {
          uid: user.uid,
          name: name,
          photo: photo,
          email: email,
          password: password,
          created_at: createdAt,
        };

        // Save User Info To The Database
        fetch("https://equis-sports-server-project.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              toast.success("User Created Successfully");
            }
          })
          .catch((err) => {
            toast.error("Error saving user data to the database.");
          });
      })
      .catch((error) => {
        toast.error("User registration failed.");
      });

    e.target.reset();
  };

  return (
    <div>
      <Helmet>
        <title>EquiSports | Register</title>
      </Helmet>
      <Navbar></Navbar>
      <div className="font-playfair min-h-screen flex flex-col items-center justify-center bg-white px-4 md:px-8 py-10">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="EquiSports Official Store" className="h-16" />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          EquiSports Official Store
        </h2>
        <h3 className="text-center text-gray-700 mb-6">
          Enter your data to create an account
        </h3>
        <div className="w-full max-w-md bg-white p-6 md:p-8">
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              />
            </div>
            {/* Photo URL Field */}
            <div>
              <label
                htmlFor="photo"
                className="block text-gray-700 font-medium mb-1"
              >
                Photo URL
              </label>
              <input
                type="text"
                id="photo"
                name="photo"
                placeholder="Enter your photo URL"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              />
            </div>
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              />
            </div>
            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              />
              {/* Error message for password */}
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>
            {/* Agreement Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="agreement"
                name="agreement"
                className="mr-2"
              />
              <label htmlFor="agreement" className="text-gray-700 text-sm">
                I agree to receive commercial communications about EquiSports
                entities, their sponsors related to the Club's activities.
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-navColor text-white font-bold py-2 px-4 hover:bg-btnColor transition duration-300"
            >
              Register
            </button>
          </form>
        </div>
        <div className="w-full max-w-md text-center mt-2 text-gray-700">
          By creating an account and registering, you confirm that you have read
          and accept the privacy policy.
          <div className="mt-2 font-bold text-center">
            <Link to="/auth/login" className="text-navColor hover:underline">
              Log In
            </Link>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Register;
