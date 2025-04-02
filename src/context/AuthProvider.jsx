import React, { createContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
    apiKey: "AIzaSyDka73p3rULtT9EVDR9iMtWhDCsY4FNdEQ",
    authDomain: "recipes-bff88.firebaseapp.com",
    projectId: "recipes-bff88",
    storageBucket: "recipes-bff88.firebasestorage.app",
    messagingSenderId: "321218631273",
    appId: "1:321218631273:web:e17dc326abc973b90bf4f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Create Context
export const FirebaseAuthContext = createContext();

export const FirebaseAuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);

            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const register = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/login"); // Redirect to login page after successful registration
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            navigate("/login"); // Redirect to login page after logout
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    return (
        <FirebaseAuthContext.Provider value={{ user, login, register, logout, setUser }}>
            {children}
        </FirebaseAuthContext.Provider>
    );
};

export default FirebaseAuthProvider;