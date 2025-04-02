import axios from "axios";
import React, { useState, useEffect } from "react";
import delicious from "../assets/delicious.jpg";
import delicious1 from "../assets/delicious1.jpg";
import delicious2 from "../assets/delicious2.jpg";

const Home = () => {
    const API_KEY = "5cb7e02c54724129bcd6402da3c77e8a";
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [recommendations, setRecommendations] = useState([]);

    const fetchRecipe = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await axios.get(
                `https://api.spoonacular.com/recipes/716429/information?apiKey=${API_KEY}&includeNutrition=true`
            );
            setRecipe(res.data);

            const recRes = await axios.get(
                `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=3&tags=main`
            );
            if (recRes.data && recRes.data.recipes) {
                setRecommendations(recRes.data.recipes);
            }

            setLoading(false);
        } catch (error) {
            console.error("API Error:", error);
            setError(error.message || "An error occurred while fetching recipes");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipe();
    }, []);

    const recommendationImages = [delicious, delicious1, delicious2];

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            {/* Hero Section */}
            <header className="relative h-[200px] flex items-center justify-center bg-cover bg-center bg-[url('../assets/hero-bg.jpg')]">
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 drop-shadow-md">
                        Tasty Delights
                    </h1>
                    <p className="text-lg mt-2 text-gray-300">
                        Discover amazing recipes crafted for every occasion.
                    </p>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-6 py-12">
                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md">
                        <p className="font-medium">Oops! Something went wrong</p>
                        <p>{error}</p>
                        <button
                            onClick={fetchRecipe}
                            className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {recipe && !loading && !error && (
                    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                        {/* Recipe Image & Overlay */}
                        <div className="relative">
                            <img
                                src={recipe.image}
                                alt={recipe.title}
                                className="w-full h-[450px] object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = delicious;
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                                <div className="p-6 w-full">
                                    <h1 className="text-4xl font-bold text-yellow-400 mb-2">
                                        {recipe.title}
                                    </h1>
                                    <div className="flex flex-wrap gap-3">
                                        <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                            {recipe.readyInMinutes} mins
                                        </span>
                                        <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                            {recipe.servings} servings
                                        </span>
                                        {recipe.vegetarian && (
                                            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                Vegetarian
                                            </span>
                                        )}
                                        {recipe.glutenFree && (
                                            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                Gluten Free
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recipe Details */}
                        <div className="p-6">
                            <div
                                className="prose prose-yellow max-w-none text-gray-300"
                                dangerouslySetInnerHTML={{ __html: recipe.summary }}
                            ></div>
                        </div>
                    </div>
                )}

                {/* Recommendations */}
                <div className="mt-12">
                    <h2 className="text-3xl font-bold text-yellow-400 mb-6">
                        You Might Also Like
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recommendations.length > 0 ? (
                            recommendations.map((rec, index) => (
                                <div
                                    key={rec.id}
                                    className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform"
                                >
                                    <img
                                        src={rec.image}
                                        alt={rec.title}
                                        className="w-full h-48 object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src =
                                                recommendationImages[index % recommendationImages.length];
                                        }}
                                    />
                                    <div className="p-4">
                                        <h3 className="font-medium text-yellow-400 truncate">
                                            {rec.title}
                                        </h3>
                                        <p className="text-sm text-gray-400">
                                            {rec.readyInMinutes} mins | {rec.servings} servings
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            [0, 1, 2].map((item) => (
                                <div
                                    key={item}
                                    className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                                >
                                    <img
                                        src={recommendationImages[item % recommendationImages.length]}
                                        alt="Recipe"
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="font-medium text-yellow-400">
                                            Another delicious recipe
                                        </h3>
                                        <p className="text-sm text-gray-400">30 mins | 4 servings</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
