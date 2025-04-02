import React, { useState, useEffect } from "react";
import axios from "axios";
import placeholderImage from "../assets/delicious.jpg";

const Recipes = () => {
    const API_KEY = "5cb7e02c54724129bcd6402da3c77e8a";
    const [query, setQuery] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
            setLoading(true);
            setError(null);

            const searchTerm = query.trim() ? query.trim() : "pizza";

            const res = await axios.get(
                `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&apiKey=${API_KEY}`
            );

            if (res.data.results.length === 0) {
                setError("No recipes found.");
            } else {
                setRecipes(res.data.results);
            }
        } catch (error) {
            setError(error.message || "Failed to fetch recipes");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleSearch();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            {/* Hero Section */}
            <header className="relative h-[300px] flex items-center justify-center bg-cover bg-center bg-[url('../assets/hero-bg.jpg')]">
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 drop-shadow-md">
                        Explore Recipes
                    </h1>
                    <p className="text-lg mt-2 text-gray-300">
                        Find delicious recipes for every occasion.
                    </p>
                </div>
            </header>

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto px-6 py-6">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for recipes..."
                        className="border-2 border-gray-600 bg-gray-800 text-white rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors"
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Recipes List */}
            <main className="max-w-6xl mx-auto px-6 py-12">
                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md text-center">
                        {error}
                    </div>
                )}

                {!loading && !error && recipes.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recipes.map((recipe) => (
                            <div
                                key={recipe.id}
                                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform"
                            >
                                <img
                                    src={recipe.image || placeholderImage}
                                    alt={recipe.title}
                                    className="w-full h-48 object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = placeholderImage;
                                    }}
                                />
                                <div className="p-4">
                                    <h3 className="font-medium text-yellow-400 truncate">
                                        {recipe.title}
                                    </h3>
                                    <button className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition-colors w-full">
                                        View Recipe
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Recipes;
