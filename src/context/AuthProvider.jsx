"use client"

import { createContext, useState, useEffect } from "react"
import { initializeApp } from "firebase/app"
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { useNavigate } from "react-router-dom"

// Updated Firebase configuration with the new API key
const firebaseConfig = {
  apiKey: "9354d74c7d9847b5b32a8f8e7f578b5b",
  authDomain: "recipes-bff88.firebaseapp.com",
  projectId: "recipes-bff88",
  storageBucket: "recipes-bff88.firebasestorage.app",
  messagingSenderId: "321218631273",
  appId: "1:321218631273:web:e17dc326abc973b90bf4f8",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

// Create Context
export const FirebaseAuthContext = createContext()

export const FirebaseAuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = async (email, password) => {
    try {
      setAuthError(null)
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      return { success: true, user: userCredential.user }
    } catch (error) {
      console.error("Login error:", error)
      let errorMessage = "Failed to login. Please try again."

      if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email. Please sign up."
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password. Please try again."
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email format."
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many failed login attempts. Please try again later."
      }

      setAuthError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const register = async (email, password, username) => {
    try {
      setAuthError(null)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      // You could update the user profile with the username here if needed
      // await updateProfile(userCredential.user, { displayName: username });

      return { success: true, user: userCredential.user }
    } catch (error) {
      console.error("Registration error:", error)
      let errorMessage = "Failed to register. Please try again."

      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email already in use. Please login or use a different email."
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email format."
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password is too weak. Please use a stronger password."
      }

      setAuthError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const loginWithGoogle = async () => {
    try {
      setAuthError(null)
      const result = await signInWithPopup(auth, googleProvider)
      return { success: true, user: result.user }
    } catch (error) {
      console.error("Google login error:", error)
      const errorMessage = "Failed to login with Google. Please try again."
      setAuthError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      navigate("/login")
      return { success: true }
    } catch (error) {
      console.error("Logout error:", error)
      const errorMessage = "Failed to logout. Please try again."
      setAuthError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  return (
    <FirebaseAuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loginWithGoogle,
        loading,
        authError,
        setAuthError,
      }}
    >
      {children}
    </FirebaseAuthContext.Provider>
  )
}

export default FirebaseAuthProvider

