import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 border-t-4 border-yellow-500 mt-12 shadow-lg">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold text-yellow-400 mb-4">Tasty Delights</h3>
                        <p className="mb-4">Discover incredible recipes that will bring joy to your kitchen and delight to your table.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-yellow-400 mb-4">Popular Categories</h3>
                        <ul className="space-y-2">
                            {["Breakfast", "Lunch", "Dinner", "Desserts", "Vegetarian"].map((category) => (
                                <li key={category}>
                                    <a href="#" className="hover:text-yellow-400 transition-colors">{category}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-yellow-400 mb-4">Subscribe</h3>
                        <p className="mb-4">Get weekly recipe inspiration directly to your inbox.</p>
                        <div className="flex">
                            <input type="email" placeholder="Your email" className="px-4 py-2 w-full rounded-l-lg focus:outline-none text-gray-800" />
                            <button className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-r-lg transition-colors">
                                Join
                            </button>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                    <p>&copy; {new Date().getFullYear()} Tasty Delights. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
