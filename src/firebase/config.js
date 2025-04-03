import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "9354d74c7d9847b5b32a8f8e7f578b5b",
  authDomain: "recipes-bff88.firebaseapp.com",
  projectId: "recipes-bff88",
  storageBucket: "recipes-bff88.firebasestorage.app",
  messagingSenderId: "321218631273",
  appId: "1:321218631273:web:e17dc326abc973b90bf4f8",
}

const app = initializeApp(firebaseConfig)

export default app

