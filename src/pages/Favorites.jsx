import { Link } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import { useFavorites } from '../hooks/useFavorites';

export default function FavoritesPage() {
  const { favorites, loading } = useFavorites();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4 py-10 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center">My Favorites</h1>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-xl shadow-md">
          <FaHeart className="h-12 w-12 text-gray-400 mb-4" />
          <h2 className="text-xl font-medium text-gray-900">Your favorites list is empty</h2>
          <p className="mt-2 text-gray-500">Start adding some recipes to your favorites!</p>
          <Link
            to="/recipes"
            className="mt-6 inline-flex items-center rounded-md border border-transparent bg-teal-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-600 transition-colors"
          >
            Browse Recipes
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favorites.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {recipe.title}
                </h3>
                <a
            href={`/recipes/${recipe.id}`}
            className="block w-full text-center py-2 px-4 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
          >
            View Recipe
          </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
