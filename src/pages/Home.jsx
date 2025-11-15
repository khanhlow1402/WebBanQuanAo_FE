import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  TrendingUp,
  Award,
  Truck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "../css/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [currentBanner, setCurrentBanner] = useState(0);

  const banners = [

    "https://i.postimg.cc/ZY9kkYYz/Frame-127.png",
    "https://i.postimg.cc/wxtKKxx6/Frame-128.png",
  ];

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000); // Change every 4 seconds

    return () => clearInterval(interval);
  });

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="min-h-[80vh]">
      {/* Hero Section - Full Banner Slider */}
      <section className="relative w-full h-[70vh] sm:h-[80vh] overflow-hidden">
        {/* Banner Images */}
        {banners.map((banner, index) => (
          <img
            key={index}
            src={banner}
            alt={`Banner ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              index === currentBanner ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevBanner}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition z-10"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={nextBanner}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition z-10"
        >
          <ChevronRight size={28} />
        </button>

        {/* Shop Now Button - Bottom Center */}


        <div className="absolute bottom-9 left-1/2 -translate-x-1/2 z-10">
          <button
            className="px-10 py-4 bg-red-500 text-white rounded-full font-bold text-lg hover:bg-red-600 transform hover:scale-110 transition duration-300 shadow-2xl"
            onClick={() => navigate("/product")}
          >
            Shop Now
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentBanner
                  ? "bg-white w-8"
                  : "bg-white bg-opacity-50 hover:bg-opacity-75"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition duration-300">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                style={{
                  background:
                    "linear-gradient(to right, rgb(0, 0, 0), rgb(75, 85, 99))",
                }}
              >
                <ShoppingBag className="text-white" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Diverse Products</h3>
              <p className="text-gray-600 text-sm">
                Hundreds of latest fashion designs
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition duration-300">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                style={{
                  background:
                    "linear-gradient(to right, rgb(0, 0, 0), rgb(75, 85, 99))",
                }}
              >
                <TrendingUp className="text-white" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Latest Trends</h3>
              <p className="text-gray-600 text-sm">
                Updated with hottest fashion trends
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition duration-300">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                style={{
                  background:
                    "linear-gradient(to right, rgb(0, 0, 0), rgb(75, 85, 99))",
                }}
              >
                <Award className="text-white" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">High Quality</h3>
              <p className="text-gray-600 text-sm">100% quality guarantee</p>
            </div>

            {/* Feature 4 */}
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition duration-300">
              <div
                className="inline-flex items-center justify-center w-16 h-16  rounded-full mb-4"
                style={{
                  background:
                    "linear-gradient(to right, rgb(0, 0, 0), rgb(75, 85, 99))",
                }}
              >
                <Truck className="text-white" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">Free shipping nationwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Start Shopping Today
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Sign up to receive special offers and latest product updates
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-3 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transform hover:scale-105 transition duration-300 shadow-lg"
            >
              Sign Up Now
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 bg-white border-2 border-gray-900 text-gray-900 rounded-full font-semibold hover:bg-gray-50 transform hover:scale-105 transition duration-300"
            >
              Already Have Account
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
