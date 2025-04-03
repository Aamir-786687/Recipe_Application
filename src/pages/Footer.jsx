import { FaFacebook, FaTwitter, FaInstagram, FaPinterest, FaYoutube } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-700 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <h3 className="text-teal-600 font-bold text-2xl">RECIPE BOOK </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Discover incredible recipes that will bring joy to your kitchen and delight to your table.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-teal-600 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-teal-600 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-teal-600 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-teal-600 transition-colors">
                <FaPinterest size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-teal-600 transition-colors">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Explore</h3>
            <ul className="space-y-2">
              {["Recipes", "Meal Plans", "Cooking Tips", "Ingredients", "Seasonal"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Categories</h3>
            <ul className="space-y-2">
              {["Breakfast", "Lunch", "Dinner", "Desserts", "Vegetarian", "Quick Meals"].map((category) => (
                <li key={category}>
                  <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Subscribe</h3>
            <p className="text-gray-600 mb-4">Get weekly recipe inspiration directly to your inbox.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-r-md transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10 pt-6 text-center">
          <p className="text-gray-600">&copy; {new Date().getFullYear()} RecipeBook. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

