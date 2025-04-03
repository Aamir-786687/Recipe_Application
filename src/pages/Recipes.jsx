"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { FaSearch, FaFilter } from "react-icons/fa"
import RecipeCard from "../Components/RecipeCard"

const Recipes = () => {
  const API_KEY = "5cb7e02c54724129bcd6402da3c77e8a"
  const [query, setQuery] = useState("")
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    diet: "",
    cuisine: "",
    type: "",
    maxReadyTime: "",
  })
  const [showFilters, setShowFilters] = useState(false)

  const cuisines = [
    "African",
    "American",
    "British",
    "Cajun",
    "Caribbean",
    "Chinese",
    "Eastern European",
    "European",
    "French",
    "German",
    "Greek",
    "Indian",
    "Irish",
    "Italian",
    "Japanese",
    "Jewish",
    "Korean",
    "Latin American",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "Southern",
    "Spanish",
    "Thai",
    "Vietnamese",
  ]

  const diets = [
    "Gluten Free",
    "Ketogenic",
    "Vegetarian",
    "Lacto-Vegetarian",
    "Ovo-Vegetarian",
    "Vegan",
    "Pescetarian",
    "Paleo",
    "Primal",
    "Low FODMAP",
    "Whole30",
  ]

  const mealTypes = [
    "Main Course",
    "Side Dish",
    "Dessert",
    "Appetizer",
    "Salad",
    "Bread",
    "Breakfast",
    "Soup",
    "Beverage",
    "Sauce",
    "Marinade",
    "Fingerfood",
    "Snack",
    "Drink",
  ]

  const handleSearch = async (e) => {
    e?.preventDefault()

    try {
      setLoading(true)
      setError(null)

      const searchTerm = query.trim() ? query.trim() : "pasta"

      let url = `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&apiKey=${API_KEY}&number=12&addRecipeInformation=true`

      // Add filters if they exist
      if (filters.diet) url += `&diet=${filters.diet}`
      if (filters.cuisine) url += `&cuisine=${filters.cuisine}`
      if (filters.type) url += `&type=${filters.type}`
      if (filters.maxReadyTime) url += `&maxReadyTime=${filters.maxReadyTime}`

      const res = await axios.get(url)

      if (res.data.results.length === 0) {
        setError("No recipes found. Try adjusting your search or filters.")
        setRecipes([])
      } else {
        setRecipes(res.data.results)
      }
    } catch (error) {
      console.error("API Error:", error)
      setError("Failed to fetch recipes. Please try again later.")
      setRecipes([])
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters({
      ...filters,
      [name]: value,
    })
  }

  const resetFilters = () => {
    setFilters({
      diet: "",
      cuisine: "",
      type: "",
      maxReadyTime: "",
    })
  }

  useEffect(() => {
    handleSearch()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Recipes</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover thousands of recipes for every occasion, taste, and dietary need
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-10">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-grow relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for recipes..."
                className="w-full py-3 px-4 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button
              type="submit"
              className="py-3 px-6 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="py-3 px-6 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center justify-center"
            >
              <FaFilter className="mr-2" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </form>

          {showFilters && (
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cuisine</label>
                  <select
                    name="cuisine"
                    value={filters.cuisine}
                    onChange={handleFilterChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Any Cuisine</option>
                    {cuisines.map((cuisine) => (
                      <option key={cuisine} value={cuisine.toLowerCase()}>
                        {cuisine}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Diet</label>
                  <select
                    name="diet"
                    value={filters.diet}
                    onChange={handleFilterChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Any Diet</option>
                    {diets.map((diet) => (
                      <option key={diet} value={diet.toLowerCase()}>
                        {diet}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meal Type</label>
                  <select
                    name="type"
                    value={filters.type}
                    onChange={handleFilterChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Any Type</option>
                    {mealTypes.map((type) => (
                      <option key={type} value={type.toLowerCase()}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Ready Time (minutes)</label>
                  <input
                    type="number"
                    name="maxReadyTime"
                    value={filters.maxReadyTime}
                    onChange={handleFilterChange}
                    placeholder="e.g. 30"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors mr-2"
                >
                  Reset Filters
                </button>
                <button
                  type="button"
                  onClick={handleSearch}
                  className="py-2 px-4 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Recipes Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6">
            <p>{error}</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {recipes.length} {recipes.length === 1 ? "Recipe" : "Recipes"} Found
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </>
        )}

        {/* No Results */}
        {!loading && !error && recipes.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No recipes found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters to find what you're looking for.</p>
            <button
              onClick={() => {
                setQuery("")
                resetFilters()
                handleSearch()
              }}
              className="py-2 px-6 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
            >
              Reset Search
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Recipes

