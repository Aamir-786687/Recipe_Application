"use client"

import { Link } from "react-router-dom"
import { FaClock, FaUtensils, FaHeart } from "react-icons/fa"
import { useFavorites } from "../context/FavoritesContext"
import { toast } from "react-toastify"
import { useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { FirebaseAuthContext } from "../context/AuthProvider"

const RecipeCard = ({ recipe, showViewButton = true }) => {
  const { favorites, addToFavorites, removeFromFavorite } = useFavorites()
  const { user } = useContext(FirebaseAuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  const isFavorite = favorites.some((fav) => fav.id === recipe.id)

  const handleFavoriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      // Redirect to login if not authenticated
      toast.info("Please login to save favorites")
      navigate("/login", { state: { from: location.pathname } })
      return
    }

    if (isFavorite) {
      removeFromFavorite(recipe.id)
      toast.info("Recipe removed from favorites")
    } else {
      addToFavorites(recipe)
      toast.success("Recipe added to favorites")
    }
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={recipe.image || "/images/placeholder-food.jpg"}
          alt={recipe.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = "/images/placeholder-food.jpg"
          }}
        />
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 p-2 rounded-full ${
            isFavorite ? "bg-red-500 text-white" : "bg-white text-gray-600"
          } shadow-md hover:scale-110 transition-transform duration-200`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <FaHeart className={isFavorite ? "text-white" : "text-gray-400 hover:text-red-500"} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-lg text-gray-900 mb-2 line-clamp-1">{recipe.title}</h3>

        <div className="flex items-center text-sm text-gray-600 mb-4">
          {recipe.readyInMinutes && (
            <div className="flex items-center mr-4">
              <FaClock className="mr-1 text-teal-500" />
              <span>{recipe.readyInMinutes} mins</span>
            </div>
          )}

          {recipe.servings && (
            <div className="flex items-center">
              <FaUtensils className="mr-1 text-teal-500" />
              <span>{recipe.servings} servings</span>
            </div>
          )}
        </div>

        {showViewButton && (
          <Link
            to={`/recipes/${recipe.id}`}
            className="block w-full text-center py-2 px-4 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
          >
            View Recipe
          </Link>
        )}
      </div>
    </div>
  )
}

export default RecipeCard

