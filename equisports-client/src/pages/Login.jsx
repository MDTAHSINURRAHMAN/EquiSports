import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import logo from "../assets/barcelona.png";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { signInUser, signInWithGoogle, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle Login with Email and Password
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        const user = result.user;

        // Set the logged-in user
        setUser(user);

        // Redirect to the intended page or homepage
        const redirectTo = location.state?.from || "/";
        navigate(redirectTo, { replace: true });

        toast.success("Logged in successfully!");

        // Update user info in the database
        const loginInfo = {
          uid: user.uid,
          email: user.email,
          lastSignInTime: user.metadata.lastSignInTime,
        };

        fetch(`https://equis-sports-server-project.vercel.app/users`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(loginInfo),
        })
          .then((res) => res.json())
          .then(() => {
            toast.success("User information updated successfully.");
          })
          .catch(() => {
            toast.error("Failed to update user information.");
          });
      })
      .catch(() => {
        toast.error("Failed to log in. Please check your credentials.");
      });
  };

  // Handle Google Login
  const handleGoogleLogin = () => {
    setLoading(true); // Set loading state
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);

        const redirectTo = location.state?.from || "/";
        navigate(redirectTo, { replace: true });
        toast.success("Logged in with Google successfully!");

        const userInfo = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };

        fetch(`https://equis-sports-server-project.vercel.app/users`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(userInfo),
        })
          .then((res) => res.json())
          .then(() => {
            toast.success("Google user information saved successfully.");
          })
          .catch(() => {
            toast.error("Failed to save Google user information.");
          });
      })
      .catch(() => {
        toast.error("Google login failed. Please try again.");
      })
      .finally(() => setLoading(false)); // Reset loading state
  };

  return (
    <div>
      <Helmet>
        <title>EquiSports | Login</title>
      </Helmet>
      <Navbar></Navbar>
      <div className="font-playfair min-h-screen flex flex-col items-center justify-center bg-white px-4 md:px-8">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Barça Official Store" className="h-16" />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          EquiSports Official Store
        </h2>
        <h3 className="text-center text-gray-700 mb-6">
          Sign in to your account
        </h3>
        <div className="w-full max-w-md bg-white shadow-lg p-6 md:p-8">
          <form onSubmit={handleLogin} className="space-y-4">
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
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  className="mr-2"
                />
                <label htmlFor="rememberMe" className="text-gray-700 text-sm">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-navColor hover:underline text-sm">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-navColor text-white font-bold py-2 px-4 hover:bg-btnColor transition duration-300"
            >
              Sign In
            </button>
          </form>
          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Login with Google
            </button>
          </div>
        </div>
        <div className="w-full max-w-md font-bold text-center mt-4 text-gray-700">
          Don't have an account?{" "}
          <Link to="/auth/register" className="text-navColor hover:underline">
            Register
          </Link>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Login;
