import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Recipes from "./pages/Recipes";
import Register from "./pages/Register";
import Login from "./pages/Login";
import RecipeDetail from "./pages/RecipeDetail";
import Favorites from "./pages/Favorites";
import { FavoritesProvider } from "./context/FavoritesContext";
import Navbarrr from "./Components/Navbarrr";
import Footer from "./pages/Footer";

const showAlert = (message) => {
  alert(message);
};

const App = () => {
  return (
    <FavoritesProvider>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbarrr />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipes/:id" element={<RecipeDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </FavoritesProvider>
  );
};

export default App;
