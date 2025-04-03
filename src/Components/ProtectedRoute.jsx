"use client"

import { useContext } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { FirebaseAuthContext } from "../context/AuthProvider"

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(FirebaseAuthContext)
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return children
}

export default ProtectedRoute

