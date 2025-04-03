// src/pages/Favorites.js
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useFavorites } from "../context/FavoritesContext";
import RecipeCard from "../Components/RecipeCard";

const Favorites = () => {
  const { favorites, loading } = useFavorites();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-10 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            My Favorite Recipes
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            All your saved recipes in one place.
          </p>
        </div>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-md">
            <div className="inline-flex justify-center items-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <FaHeart className="text-gray-400 text-2xl" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              No favorites yet
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Start exploring recipes and save your favorites to access them
              quickly later.
            </p>
            <Link
              to="/recipes"
              className="inline-block py-3 px-6 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
            >
              Explore Recipes
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
