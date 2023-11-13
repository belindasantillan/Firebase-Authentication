// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAk5vLPDh70m-TJQ93CO_4Vg3ljgNsGm_o",
  authDomain: "fir-authentication-26828.firebaseapp.com",
  projectId: "fir-authentication-26828",
  storageBucket: "fir-authentication-26828.appspot.com",
  messagingSenderId: "881464316734",
  appId: "1:881464316734:web:ec5f2e229fa5ae5e64d26f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();