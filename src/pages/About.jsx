import { FaUtensils, FaLeaf, FaHeart, FaUsers, FaGlobeAmericas, FaBookOpen } from "react-icons/fa"

const About = () => {
  const features = [
    {
      icon: <FaUtensils className="text-teal-500 text-3xl" />,
      title: "Diverse Recipes",
      description:
        "Explore thousands of recipes from various cuisines around the world, from quick weeknight dinners to elaborate holiday feasts.",
    },
    {
      icon: <FaLeaf className="text-teal-500 text-3xl" />,
      title: "Dietary Options",
      description:
        "Find recipes that match your dietary preferences, whether you're vegetarian, vegan, gluten-free, or following any other special diet.",
    },
    {
      icon: <FaHeart className="text-teal-500 text-3xl" />,
      title: "Save Favorites",
      description:
        "Keep track of recipes you love by saving them to your favorites for quick access anytime you need cooking inspiration.",
    },
    {
      icon: <FaUsers className="text-teal-500 text-3xl" />,
      title: "Community Driven",
      description:
        "Join a community of food lovers who share their passion for cooking and discovering new flavors and techniques.",
    },
    {
      icon: <FaGlobeAmericas className="text-teal-500 text-3xl" />,
      title: "Global Cuisine",
      description:
        "Discover authentic recipes from around the world, bringing international flavors right to your kitchen.",
    },
    {
      icon: <FaBookOpen className="text-teal-500 text-3xl" />,
      title: "Detailed Instructions",
      description:
        "Follow easy step-by-step instructions with detailed information to ensure your cooking success every time.",
    },
  ]

  const team = [
    {
      name: "Emma Rodriguez",
      role: "Head Chef & Founder",
      image: "/images/chef-1.jpg",
      bio: "Emma has over 15 years of culinary experience in top restaurants across Europe and America. She founded CulinaryDelight to share her passion for accessible gourmet cooking.",
    },
    {
      name: "David Chen",
      role: "Nutrition Specialist",
      image: "/images/chef-2.jpg",
      bio: "With a background in nutritional science, David ensures all our recipes are balanced and provides expert advice on dietary requirements and healthy eating.",
    },
    {
      name: "Sarah Johnson",
      role: "Recipe Developer",
      image: "/images/chef-3.jpg",
      bio: "Sarah specializes in developing and testing recipes that are both delicious and foolproof. She has a knack for simplifying complex techniques for home cooks.",
    },
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[400px]"
        style={{ backgroundImage: "url('/images/about-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About CulinaryDelight</h1>
          <p className="text-xl text-white max-w-2xl">
            Bringing delicious recipes and culinary inspiration to food lovers around the world
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Story</h2>
              <div className="w-20 h-1 bg-teal-500 mb-6"></div>
              <p className="text-gray-700 mb-4">
                CulinaryDelight began in 2018 with a simple mission: to make cooking accessible, enjoyable, and
                delicious for everyone. What started as a small blog sharing family recipes has grown into a
                comprehensive platform with thousands of recipes from around the world.
              </p>
              <p className="text-gray-700 mb-4">
                Our team of passionate chefs, food writers, and nutritionists work together to create, test, and perfect
                every recipe before it reaches you. We believe that good food brings people together, and we're
                dedicated to helping you create memorable meals.
              </p>
              <p className="text-gray-700">
                Whether you're a beginner cook looking for simple weeknight dinners or an experienced chef seeking
                culinary challenges, CulinaryDelight is your trusted companion in the kitchen.
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                src="/images/about-story.jpg"
                alt="Our culinary journey"
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">What We Offer</h2>
            <div className="w-20 h-1 bg-teal-500 mx-auto mb-6"></div>
            <p className="text-gray-700 max-w-2xl mx-auto">
              CulinaryDelight provides everything you need to explore the world of cooking and create amazing meals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Meet Our Team</h2>
            <div className="w-20 h-1 bg-teal-500 mx-auto mb-6"></div>
            <p className="text-gray-700 max-w-2xl mx-auto">The passionate culinary experts behind CulinaryDelight</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-teal-600 mb-4">{member.role}</p>
                  <p className="text-gray-700">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-teal-500 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your Culinary Journey Today</h2>
          <p className="mb-8 text-teal-100">
            Explore our collection of recipes and discover the joy of cooking delicious meals at home
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/recipes"
              className="py-3 px-8 bg-white text-teal-600 font-medium rounded-md hover:bg-gray-100 transition-colors"
            >
              Browse Recipes
            </a>
            <a
              href="/register"
              className="py-3 px-8 bg-teal-700 text-white font-medium rounded-md hover:bg-teal-800 transition-colors"
            >
              Create Account
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About

