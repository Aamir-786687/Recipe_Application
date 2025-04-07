import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSearch, FaUtensils, FaClock, FaLeaf } from "react-icons/fa";
import RecipeCard from "../Components/RecipeCard";
import bg from '../assets/Hero-bg.jpg'

const Home = () => {
  const API_KEY = "16ee2db26f5d46d8928bd7621ab5d9c2";
  const [featuredRecipe, setFeaturedRecipe] = useState(null);
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Featured recipe
        const featuredRes = await axios.get(
          `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=1`
        );

        if (
          featuredRes.data &&
          featuredRes.data.recipes &&
          featuredRes.data.recipes.length > 0
        ) {
          setFeaturedRecipe(featuredRes.data.recipes[0]);
        }

        // Trending recipes
        const trendingRes = await axios.get(
          `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=6`
        );

        if (trendingRes.data && trendingRes.data.recipes) {
          setTrendingRecipes(trendingRes.data.recipes);
        }

        setLoading(false);
      } catch (error) {
        console.error("API Error:", error);
        setError("Failed to load recipes. Please try again later.");
        setLoading(false);
      }
    };

    // Set up categories
    setCategories([
      {
        name: "Breakfast",
        image: "/images/category-breakfast.jpg",
        icon: <FaUtensils className="text-yellow-500" />,
      },
      {
        name: "Lunch",
        image: "/images/category-lunch.jpg",
        icon: <FaUtensils className="text-orange-500" />,
      },
      {
        name: "Dinner",
        image: "/images/category-dinner.jpg",
        icon: <FaUtensils className="text-red-500" />,
      },
      {
        name: "Desserts",
        image: "/images/category-dessert.jpg",
        icon: <FaUtensils className="text-pink-500" />,
      },
      {
        name: "Quick Meals",
        image: "/images/category-quick.jpg",
        icon: <FaClock className="text-blue-500" />,
      },
      {
        name: "Vegetarian",
        image: "/images/category-vegetarian.jpg",
        icon: <FaLeaf className="text-green-500" />,
      },
    ]);

    fetchData();
  }, []);

  return (
    <div className="bg-gray-50 ">
      {/* Hero Section */}
      <section
  className="relative bg-cover bg-center h-[500px]"
  style={{ backgroundImage: `url(${bg})`}}
>
  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
  <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
      Discover Delicious Recipes
    </h1>
    <p className="text-xl text-white mb-8 max-w-2xl">
      Find and save the perfect recipes for any occasion, cuisine, or dietary preference
    </p>

  </div>
</section>

      {/* Featured Recipe */}
      {featuredRecipe && (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Featured Recipe
            </h2>
            <div className="w-20 h-1 bg-teal-500 mb-8"></div>

            <div className="bg-white rounded-xl overflow-hidden shadow-xl">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={featuredRecipe.image || "/images/placeholder-food.jpg"}
                    alt={featuredRecipe.title}
                    className="w-full h-64 md:h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/placeholder-food.jpg";
                    }}
                  />
                </div>
                <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {featuredRecipe.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {featuredRecipe.dishTypes &&
                        featuredRecipe.dishTypes
                          .slice(0, 3)
                          .map((type, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm"
                            >
                              {type}
                            </span>
                          ))}
                    </div>
                    <div className="flex items-center text-gray-600 mb-6">
                      <div className="flex items-center mr-6">
                        <FaClock className="mr-2 text-teal-500" />
                        <span>{featuredRecipe.readyInMinutes} minutes</span>
                      </div>
                      <div className="flex items-center">
                        <FaUtensils className="mr-2 text-teal-500" />
                        <span>{featuredRecipe.servings} servings</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {featuredRecipe.summary ? (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: featuredRecipe.summary.replace(
                              /<\/?[^>]+(>|$)/g,
                              ""
                            ),
                          }}
                        ></span>
                      ) : (
                        "A delicious recipe worth trying!"
                      )}
                    </p>
                  </div>
                  <Link
                    to={`/recipes/${featuredRecipe.id}`}
                    className="inline-block py-3 px-6 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
                  >
                    View Recipe
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-12 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Browse Categories
          </h2>
          <div className="w-20 h-1 bg-teal-500 mb-8"></div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-32">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="flex justify-center mb-2">
                        {category.icon}
                      </div>
                      <h3 className="font-medium">{category.name}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Recipes */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Trending Recipes
          </h2>
          <div className="w-20 h-1 bg-teal-500 mb-8"></div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
              <p>{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link
              to="/recipes"
              className="inline-block py-3 px-8 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
            >
              View All Recipes
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-teal-500 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="mb-8">
            Get weekly recipes and cooking tips delivered straight to your inbox
          </p>

          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow py-3 px-4 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-300"
            />
            <button className="py-3 px-6 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
