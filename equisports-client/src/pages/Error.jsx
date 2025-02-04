import { Helmet } from "react-helmet-async";

const Error = () => {
  return (
    <div className="font-playfair flex items-center justify-center min-h-screen bg-navColor">
        <Helmet>
        <title>EquiSports | Error</title>
      </Helmet>
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-sm text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
        <p className="text-lg text-gray-700 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="px-6 py-3 bg-btnColor text-white font-semibold rounded-lg shadow-md hover:bg-red-800 transition duration-300"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default Error;