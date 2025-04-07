import React from "react";
import { FaHeart } from "react-icons/fa";
import { useFavorites } from "../hooks/useFavorites";

export default function RecipeCard({ recipe, showViewButton = true }) {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const isFavorite = favorites.some((fav) => fav.id === recipe.id);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite) {
      removeFromFavorites(recipe.id);
    } else {
      addToFavorites(recipe);
    }
  };

  return (
    <div className="group relative bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48 w-full bg-gray-100">
        <img
          src={recipe.image || "/images/placeholder-food.jpg"}
          alt={recipe.title}
          className="object-cover object-center w-full h-full"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/placeholder-food.jpg";
          }}
        />
        <button
          onClick={toggleFavorite}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <FaHeart
            className={`h-5 w-5 transition-colors ${
              isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-500"
            }`}
          />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-lg text-gray-900 mb-2 line-clamp-1">
          {recipe.title}
        </h3>

        <div className="flex items-center text-sm text-gray-600 mb-4">
          {recipe.readyInMinutes && (
            <div className="flex items-center mr-4">
              <span className="mr-1 text-teal-500">⏱️</span>
              <span>{recipe.readyInMinutes} mins</span>
            </div>
          )}
          {recipe.servings && (
            <div className="flex items-center">
              <span className="mr-1 text-teal-500">🍽️</span>
              <span>{recipe.servings} servings</span>
            </div>
          )}
        </div>

        {showViewButton && (
          <a
            href={`/recipes/${recipe.id}`}
            className="block w-full text-center py-2 px-4 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
          >
            View Recipe
          </a>
        )}
      </div>
    </div>
  );
}
