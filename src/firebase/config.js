// =============================================================================
// Firebase Configuration
// All Firebase SDK communications use HTTPS/TLS encryption in transit.
// This addresses Security Checklist Items 1 (Authentication) and 3 (Encryption).
// =============================================================================

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase project configuration
// In production, these would be stored in environment variables (.env)
const firebaseConfig = {
    apiKey: "AIzaSyDK4gJB0xbrtlg6RVJ-MUn8MrcAmWWCC8g",
    authDomain: "serbisure-970bc.firebaseapp.com",
    projectId: "serbisure-970bc",
    storageBucket: "serbisure-970bc.firebasestorage.app",
    messagingSenderId: "933039253892",
    appId: "1:933039253892:web:f3b2edc64cd29730efd5d1",
    measurementId: "G-P23KBEL3NR"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Firebase Authentication — uses HTTPS/TLS for all auth operations
// Supports: Email/Password, Google OAuth, session token management
export const auth = getAuth(app);

// Firestore Database — NoSQL document store with built-in security rules
// All Firestore SDK operations are encrypted in transit via HTTPS/TLS
export const db = getFirestore(app);

export default app;
