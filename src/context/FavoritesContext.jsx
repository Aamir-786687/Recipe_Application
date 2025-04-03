// src/context/FavoritesContext.js
import { createContext, useState, useContext, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { FirebaseAuthContext } from "./AuthProvider";

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(FirebaseAuthContext);
  const db = getFirestore();

  // Fetch favorites when user changes
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const q = query(
          collection(db, "favorites"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);

        const favoritesData = querySnapshot.docs.map((doc) => ({
          id: doc.data().recipeId,
          docId: doc.id,
          ...doc.data().recipeData,
        }));

        setFavorites(favoritesData);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user, db]);

  // Add to favorites
  const addToFavorites = async (recipe) => {
    if (!user) return;

    try {
      const docRef = await addDoc(collection(db, "favorites"), {
        userId: user.uid,
        recipeId: recipe.id,
        recipeData: { ...recipe, id: recipe.id }, // Ensure ID is stored
        createdAt: new Date(),
      });

      setFavorites((prevFavorites) => [
        ...prevFavorites,
        { ...recipe, docId: docRef.id },
      ]);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  // Remove from favorites
  const removeFromFavorite = async (recipeId) => {
    if (!user) return;

    try {
      const favorite = favorites.find((fav) => fav.id === recipeId);

      if (!favorite || !favorite.docId) {
        // Try to find the document ID if not cached
        const q = query(
          collection(db, "favorites"),
          where("userId", "==", user.uid),
          where("recipeId", "==", recipeId)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          await deleteDoc(doc(db, "favorites", querySnapshot.docs[0].id));
        }
      } else {
        await deleteDoc(doc(db, "favorites", favorite.docId));
      }

      setFavorites(favorites.filter((fav) => fav.id !== recipeId));
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, loading, addToFavorites, removeFromFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
