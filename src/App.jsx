import { Route, Routes, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Recipes from "./pages/Recipes"
import Register from "./pages/Register"
import Login from "./pages/Login"
import RecipeDetail from "./pages/RecipeDetail"
import Favorites from "./pages/Favorites"
import { FirebaseAuthProvider } from "./context/AuthProvider"
import Navbarrr from "./Components/Navbarrr"
import Footer from "./pages/Footer"

const App = () => {
  return (
    <FirebaseAuthProvider>
      
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
      
    </FirebaseAuthProvider>
  );
};

export default App;