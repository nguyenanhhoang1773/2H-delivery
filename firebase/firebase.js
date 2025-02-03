// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
const firebaseConfig = {
  apiKey: "AIzaSyBvVQNBXT1YzrNJ6HxNsL46FHmo02xH6LI",
  authDomain: "h-delivery-49106.firebaseapp.com",
  projectId: "h-delivery-49106",
  storageBucket: "h-delivery-49106.firebasestorage.app",
  messagingSenderId: "538979186198",
  appId: "1:538979186198:web:cd08b557a5eb754eb9e737",
  measurementId: "G-F39QE6050G",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "it";

const analytics = getAnalytics(app);
export { auth, provider, analytics };
