"use client"

import { useState, useContext, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { FaGoogle, FaUser, FaEnvelope, FaLock, FaExclamationCircle } from "react-icons/fa"
import { FirebaseAuthContext } from "../context/AuthProvider"

const Register = () => {
  const navigate = useNavigate()
  const { register, loginWithGoogle, authError, setAuthError, user } = useContext(FirebaseAuthContext)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)

  // If user is already logged in, redirect to home
  useEffect(() => {
    if (user) {
      navigate("/")
    }

    // Clear any auth errors when component mounts
    return () => {
      if (setAuthError) setAuthError(null)
    }
  }, [user, navigate, setAuthError])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    // Clear field-specific error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.username.trim()) newErrors.username = "Username is required"

    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"

    if (!formData.password) newErrors.password = "Password is required"
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters"

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitting(true)
      const result = await register(formData.email, formData.password, formData.username)
      setIsSubmitting(false)

      if (result.success) {
        setRegistrationSuccess(true)
        // Redirect to login after a short delay
        setTimeout(() => {
          navigate("/login")
        }, 2000)
      } else {
        // Error is handled by the context
        setErrors((prev) => ({ ...prev, general: result.error }))
      }
    }
  }

  const handleGoogleSignup = async () => {
    try {
      setIsSubmitting(true)
      const result = await loginWithGoogle()
      setIsSubmitting(false)

      if (result.success) {
        navigate("/")
      } else {
        setErrors((prev) => ({ ...prev, general: result.error }))
      }
    } catch (error) {
      setIsSubmitting(false)
      setErrors((prev) => ({ ...prev, general: "An unexpected error occurred. Please try again." }))
    }
  }

  if (registrationSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-700 text-center">
          <div className="text-green-400 text-5xl mb-4">✓</div>
          <h2 className="text-2xl font-bold mb-4">Registration Successful!</h2>
          <p className="mb-6 text-gray-300">Your account has been created. Redirecting you to login...</p>
          <Link
            to="/login"
            className="inline-block py-3 px-6 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-600 transition duration-200"
          >
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
      <div className="w-full max-w-md bg-gray-800 p-8 m-10 rounded-xl shadow-xl border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-yellow-400 mb-6">Create Your Account</h2>

        {(errors.general || authError) && (
          <div className="mb-4 p-3 bg-red-500/80 text-white rounded-lg flex items-center">
            <FaExclamationCircle className="mr-2 flex-shrink-0" />
            <span>{errors.general || authError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Username</label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-500" />
              </div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={`w-full pl-10 p-3 bg-gray-700 border ${
                  errors.username ? "border-red-500" : "border-gray-600"
                } rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400`}
                placeholder="Enter your username"
              />
            </div>
            {errors.username && <p className="mt-1 text-sm text-red-400">{errors.username}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Email Address</label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-500" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-10 p-3 bg-gray-700 border ${
                  errors.email ? "border-red-500" : "border-gray-600"
                } rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-500" />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pl-10 p-3 bg-gray-700 border ${
                  errors.password ? "border-red-500" : "border-gray-600"
                } rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400`}
                placeholder="Enter your password"
              />
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Confirm Password</label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-500" />
              </div>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full pl-10 p-3 bg-gray-700 border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-600"
                } rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400`}
                placeholder="Confirm your password"
              />
            </div>
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-600 transition duration-200 ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Separator */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-800 text-gray-400">Or sign up with</span>
          </div>
        </div>

        {/* Google Signup */}
        <button
          onClick={handleGoogleSignup}
          disabled={isSubmitting}
          className={`w-full py-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg flex items-center justify-center space-x-3 hover:bg-gray-600 transition duration-200 ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          <FaGoogle className="text-red-500" size={20} />
          <span>{isSubmitting ? "Processing..." : "Sign up with Google"}</span>
        </button>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-400 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register

