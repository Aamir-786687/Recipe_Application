### Recipe Management Web Application

## 📌 Overview

This is a Recipe Management Web Application built with React and Firebase. It allows users to:

Register and log in using Firebase Authentication.

Add, view, edit, and delete recipes.

Like and favorite recipes.

Search recipes by title and filter them by category.

Navigate seamlessly using React Router.

## 🛠️ Tech Stack

# Frontend: 
React, React Router, Tailwind CSS

# Backend: 
Firebase Authentication, Firebase Firestore/Realtime Database

# Hosting: 
Firebase Hosting

## 🚀 Features

Authentication: User registration and login with Firebase Auth.

CRUD Operations: Create, Read, Update, and Delete recipes.

Favorites & Likes: Users can like and favorite recipes.

Filtering & Searching: Find recipes easily with search and category filters.

Navigation: Smooth routing using React Router.

## 📂 Folder Structure

📦 recipe-management-app


├── 📂 public           # Static assets (images, icons, etc.)


├── 📂 src

│   ├── 📂 components   # Reusable UI components (Navbar, Footer, etc.)

│   ├── 📂 pages        # Page components (Home, About, Recipes, Register, Login)

│   ├── 📂 assets       # Images and other static assets

│   ├── 📜 App.js       # Main application file

│   ├── 📜 index.js     # Entry point

│   ├── 📜 firebase.js  # Firebase configuration

├── 📜 .gitignore       # Git ignore file

├── 📜 package.json     # Project dependencies

├── 📜 README.md        # Project documentation


## 🛠️ Installation & Setup

Clone the repository:

git clone https://github.com/Aamir-786687/Recipe_Application
cd Recipe_Application

Install dependencies:

npm install

Set up Firebase:

Create a Firebase project.

Enable Authentication (Email/Password sign-in method).

Set up Firestore or Realtime Database.

Get your Firebase config and add it to firebase.js.

Run the development server:

npm run dev

## 🔥 Deployment

Deploy to Versel Hosting: