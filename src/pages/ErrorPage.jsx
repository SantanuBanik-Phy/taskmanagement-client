import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import errorAnimation from "../assets/error-404.json"; 

const ErrorPage = () => {
    return (
        <div className="hero min-h-screen bg-gradient-to-br from-gray-200 via-white to-gray-300 flex flex-col items-center justify-center text-center">
            <Helmet>
                <title>Error | MicroTask</title>
            </Helmet>

            <div className="max-w-lg">
                <Lottie animationData={errorAnimation} loop={true} className="w-full max-w-md mx-auto" />
                <h1 className="text-5xl font-extrabold text-gray-800 mt-6">Oops! Page Not Found</h1>
                <p className="py-4 text-gray-600 text-lg">
                    It looks like the page you’re trying to visit doesn’t exist.
                </p>
                <Link
                    to="/"
                    className="mt-4 inline-block px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold text-lg rounded-lg shadow-lg hover:from-green-600 hover:to-green-800 transition-all duration-300"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
