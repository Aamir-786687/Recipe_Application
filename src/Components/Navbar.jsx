import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { FirebaseAuthContext } from "../context/AuthProvider";

const Navbar = () => {
    const { user, logout } = useContext(FirebaseAuthContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg border-b-4 border-yellow-500 ${scrolled ? "py-2" : "py-4"} sticky top-0 z-50 transition-all`}>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-700 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
                        <span className="text-white font-bold text-xl">RECIPE BOOK</span>
                    </div>

                    <div className="hidden md:flex space-x-6">
                        {["Home", "Recipes", "About"].map((item) => (
                            <NavLink
                                key={item}
                                to={`/${item.toLowerCase()}`}
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-lg text-white font-medium transition-all ${isActive ? "bg-yellow-500" : "hover:text-yellow-400"}`
                                }
                            >
                                {item}
                            </NavLink>
                        ))}
                        {user ? (
                            <button
                                onClick={logout}
                                className="px-5 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-500 transition"
                            >
                                Logout
                            </button>
                        ) : (
                            <NavLink
                                to="/register"
                                className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 transition"
                            >
                                Register
                            </NavLink>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-md text-white hover:bg-gray-700 transition"
                        >
                            ☰
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-gray-900 text-white px-4 py-3 space-y-3 shadow-lg transition-all">
                    {["Home", "Recipes", "About"].map((item) => (
                        <NavLink
                            key={item}
                            to={`/${item.toLowerCase()}`}
                            className="block px-3 py-2 rounded-md hover:bg-gray-700 transition"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item}
                        </NavLink>
                    ))}
                    {user ? (
                        <button
                            onClick={() => {
                                logout();
                                setIsMobileMenuOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 rounded-md bg-red-600 hover:bg-red-500 transition"
                        >
                            Logout
                        </button>
                    ) : (
                        <NavLink
                            to="/register"
                            className="block px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-500 transition"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Register
                        </NavLink>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
