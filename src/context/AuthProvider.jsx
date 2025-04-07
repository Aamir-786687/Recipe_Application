"use client"

import { createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth"
import { app } from "../firebase/config"

// Create Context
export const FirebaseAuthContext = createContext()

export const FirebaseAuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Get auth instance from the initialized app
  const auth = getAuth(app)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [auth])

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const register = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      navigate("/login") // Redirect to login page after successful registration
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      navigate("/login") // Redirect to login page after logout
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  return (
    <FirebaseAuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </FirebaseAuthContext.Provider>
  )
}

export default FirebaseAuthProvider

