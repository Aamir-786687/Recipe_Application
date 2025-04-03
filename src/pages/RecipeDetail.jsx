"use client"

import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { FaClock, FaUtensils, FaHeart, FaRegHeart, FaPrint, FaShare, FaCheckCircle } from "react-icons/fa"
import { useFavorites } from "../context/FavoritesContext"
import { FirebaseAuthContext } from "../context/AuthProvider"

const RecipeDetail = () => {
  const { id } = useParams()
  const API_KEY = "9354d74c7d9847b5b32a8f8e7f578b5b"
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("ingredients")
  const { favorites, addToFavorites, removeFromFavorite } = useFavorites()
  const { user } = useContext(FirebaseAuthContext)
  const navigate = useNavigate()

  const isFavorite = favorites.some((fav) => fav.id === Number.parseInt(id))

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=true`,
        )

        setRecipe(res.data)
        setLoading(false)
      } catch (error) {
        console.error("API Error:", error)
        setError("Failed to load recipe details. Please try again later.")
        setLoading(false)
      }
    }

    fetchRecipe()
  }, [id])

  const handleFavoriteToggle = () => {
    if (!user) {
      // Redirect to login if not authenticated
      alert("Please login to save favorites")
      navigate("/login", { state: { from: `/recipes/${id}` } })
      return
    }

    if (isFavorite) {
      removeFromFavorite(Number.parseInt(id))
      alert("Recipe removed from favorites")
    } else {
      addToFavorites(recipe)
      alert("Recipe added to favorites")
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: recipe.title,
          text: `Check out this recipe: ${recipe.title}`,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing:", error))
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
          <p className="font-medium">Error</p>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  if (!recipe) return null

  return (
    <div className="bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="relative h-96">
            <img
              src={recipe.image || "/images/placeholder-food.jpg"}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6 w-full">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{recipe.title}</h1>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-wrap justify-between items-center mb-6">
              <div className="flex items-center space-x-6 text-gray-700">
                <div className="flex items-center">
                  <FaClock className="mr-2 text-teal-500" />
                  <span>{recipe.readyInMinutes} minutes</span>
                </div>
                <div className="flex items-center">
                  <FaUtensils className="mr-2 text-teal-500" />
                  <span>{recipe.servings} servings</span>
                </div>
              </div>

              <div className="flex space-x-3 mt-4 sm:mt-0">
                <button
                  onClick={handleFavoriteToggle}
                  className={`flex items-center px-4 py-2 rounded-md ${
                    isFavorite ? "bg-red-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  } transition-colors`}
                >
                  {isFavorite ? <FaHeart className="mr-2" /> : <FaRegHeart className="mr-2" />}
                  {isFavorite ? "Saved" : "Save"}
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <FaPrint className="mr-2" />
                  Print
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <FaShare className="mr-2" />
                  Share
                </button>
              </div>
            </div>

            <div className="prose max-w-none mb-6">
              <div dangerouslySetInnerHTML={{ __html: recipe.summary }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab("ingredients")}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === "ingredients"
                    ? "border-b-2 border-teal-500 text-teal-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Ingredients
              </button>
              <button
                onClick={() => setActiveTab("instructions")}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === "instructions"
                    ? "border-b-2 border-teal-500 text-teal-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Instructions
              </button>
              <button
                onClick={() => setActiveTab("nutrition")}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === "nutrition"
                    ? "border-b-2 border-teal-500 text-teal-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Nutrition
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "ingredients" && (
              <ul className="space-y-3">
                {recipe.extendedIngredients?.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <FaCheckCircle className="text-teal-500 mt-1 mr-2 flex-shrink-0" />
                    <span>
                      <span className="font-medium">
                        {ingredient.amount} {ingredient.unit}
                      </span>{" "}
                      {ingredient.originalName || ingredient.name}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetail

