import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { FirebaseAuthContext } from "../context/AuthProvider";
import {
  FaHeart,
  FaHome,
  FaUtensils,
  FaInfoCircle,
  FaUser,
} from "react-icons/fa";

const Navbarrr = () => {
  const { user, logout } = useContext(FirebaseAuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`bg-white shadow-md sticky top-0 z-50 transition-all ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/home" className="flex items-center">
              <span className="text-teal-600 font-bold text-2xl">
                RECIPE BOOK{" "}
              </span>
            </NavLink>
          </div>

          <div className="hidden md:flex space-x-6">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "text-white bg-teal-500"
                    : "text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                }`
              }
            >
              <FaHome className="mr-1" /> Home
            </NavLink>
            <NavLink
              to="/recipes"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "text-white bg-teal-500"
                    : "text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                }`
              }
            >
              <FaUtensils className="mr-1" /> Recipes
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "text-white bg-teal-500"
                    : "text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                }`
              }
            >
              <FaHeart className="mr-1" /> Favorites
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "text-white bg-teal-500"
                    : "text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                }`
              }
            >
              <FaInfoCircle className="mr-1" /> About
            </NavLink>

            {user ? (
              <button
                onClick={logout}
                className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 transition-colors"
              >
                <FaUser className="mr-1" /> Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-md shadow-sm hover:bg-teal-600 transition-colors"
              >
                <FaUser className="mr-1" /> Login
              </NavLink>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white px-4 pt-2 pb-4 space-y-2 shadow-lg">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? "bg-teal-500 text-white"
                  : "text-gray-700 hover:bg-teal-50 hover:text-teal-600"
              }`
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FaHome className="mr-2" /> Home
          </NavLink>
          <NavLink
            to="/recipes"
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? "bg-teal-500 text-white"
                  : "text-gray-700 hover:bg-teal-50 hover:text-teal-600"
              }`
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FaUtensils className="mr-2" /> Recipes
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? "bg-teal-500 text-white"
                  : "text-gray-700 hover:bg-teal-50 hover:text-teal-600"
              }`
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FaHeart className="mr-2" /> Favorites
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? "bg-teal-500 text-white"
                  : "text-gray-700 hover:bg-teal-50 hover:text-teal-600"
              }`
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FaInfoCircle className="mr-2" /> About
          </NavLink>

          {user ? (
            <button
              onClick={() => {
                logout();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center px-3 py-2 bg-red-500 text-white rounded-md"
            >
              <FaUser className="mr-2" /> Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="w-full flex items-center px-3 py-2 bg-teal-500 text-white rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaUser className="mr-2" /> Login
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbarrr;
