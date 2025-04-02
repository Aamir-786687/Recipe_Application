import React from "react";

const About = () => {
  const recipe = {
    title: "Classic Homemade Sourdough Bread",
    subtitle: "A traditional sourdough with a perfect crust and chewy interior",
    description:
      "This artisanal sourdough bread features a crispy, golden crust and a tender, chewy interior with that distinctive sourdough tang. Made with a mature starter and a slow fermentation process, this bread develops complex flavors and the perfect texture.",
    chef: {
      name: "Maria Collins",
      title: "Head Baker",
      bio: "Maria has been baking sourdough for over 15 years and studied with master bakers across Europe.",
      avatar:
        "data:image/jpeg;base64,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",
    },
    stats: {
      prepTime: "30 minutes",
      proofTime: "12-14 hours",
      bakeTime: "45 minutes",
      difficulty: "Intermediate",
      servings: "1 large loaf",
    },
    story:
      "This recipe was developed during my time in San Francisco, where I was inspired by the city's rich sourdough tradition. After months of experimentation and many early mornings tending to my starter, I finally perfected this recipe that balances tang, structure, and that coveted open crumb.",
    ingredients: [
      "500g bread flour",
      "350g filtered water",
      "100g active sourdough starter",
      "10g salt",
    ],
    nutritionalInfo: {
      calories: "180 per slice",
      protein: "6g",
      carbs: "36g",
      fat: "0.8g",
    },
    tips: [
      "Use a kitchen scale for accurate measurements",
      "Keep your starter at room temperature for 12 hours before baking",
      "For the best crust, use a Dutch oven preheated at 500°F",
    ],
    relatedRecipes: [
      { name: "Rustic Country Loaf", path: "/recipes/country-loaf" },
      { name: "Seeded Multigrain Bread", path: "/recipes/multigrain" },
      { name: "Overnight Pizza Dough", path: "/recipes/pizza-dough" },
    ],
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8 text-gray-300 bg-gray-900 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
          <h1 className="text-3xl font-bold text-indigo-400 mb-2">
            {recipe.title}
          </h1>
          <p className="text-lg text-indigo-300 mb-4">{recipe.subtitle}</p>
          <p className="text-gray-400">{recipe.description}</p>
        </div>

        {/* Chef Info and Stats */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* Chef Info */}
          <div className="flex-1 bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <img
                src={recipe.chef.avatar}
                alt={recipe.chef.name}
                className="w-16 h-16 rounded-full border-2 border-indigo-400 mr-4"
              />
              <div>
                <h3 className="font-bold text-white">{recipe.chef.name}</h3>
                <p className="text-gray-400">{recipe.chef.title}</p>
              </div>
            </div>
            <p className="text-gray-400">{recipe.chef.bio}</p>
          </div>

          {/* Recipe Stats */}
          <div className="flex-1 bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="font-bold text-white mb-4">Recipe Details</h3>
            <div className="grid grid-cols-2 gap-y-3">
              <span className="text-gray-400">Prep Time:</span>
              <span className="text-gray-300">{recipe.stats.prepTime}</span>

              <span className="text-gray-400">Proofing Time:</span>
              <span className="text-gray-300">{recipe.stats.proofTime}</span>

              <span className="text-gray-400">Baking Time:</span>
              <span className="text-gray-300">{recipe.stats.bakeTime}</span>

              <span className="text-gray-400">Difficulty:</span>
              <span className="text-gray-300">{recipe.stats.difficulty}</span>

              <span className="text-gray-400">Servings:</span>
              <span className="text-gray-300">{recipe.stats.servings}</span>
            </div>
          </div>
        </div>

        {/* Recipe Story */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            The Story Behind This Recipe
          </h2>
          <p className="text-gray-400">{recipe.story}</p>
        </div>

        {/* Ingredients and Nutrition */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* Ingredients */}
          <div className="flex-1 bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Main Ingredients
            </h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
                  <span className="text-gray-300">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Nutritional Info */}
          <div className="flex-1 bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Nutritional Information
            </h2>
            <div className="grid grid-cols-2 gap-y-3">
              <span className="text-gray-400">Calories:</span>
              <span className="text-gray-300">
                {recipe.nutritionalInfo.calories}
              </span>

              <span className="text-gray-400">Protein:</span>
              <span className="text-gray-300">
                {recipe.nutritionalInfo.protein}
              </span>

              <span className="text-gray-400">Carbs:</span>
              <span className="text-gray-300">
                {recipe.nutritionalInfo.carbs}
              </span>

              <span className="text-gray-400">Fat:</span>
              <span className="text-gray-300">
                {recipe.nutritionalInfo.fat}
              </span>
            </div>
          </div>
        </div>

        {/* Pro Tips */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-6 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold text-indigo-400 mb-4">Pro Tips</h2>
          <ul className="space-y-3">
            {recipe.tips.map((tip, index) => (
              <li key={index} className="flex items-start">
                <span className="bg-indigo-400 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-gray-300">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Related Recipes */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recipe.relatedRecipes.map((related, index) => (
              <div
                key={index}
                className="bg-gray-700 rounded p-4 text-center hover:bg-indigo-500 transition-colors cursor-pointer"
              >
                <h3 className="font-medium text-white">{related.name}</h3>
                <p className="text-sm text-gray-400 mt-1">View Recipe</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
