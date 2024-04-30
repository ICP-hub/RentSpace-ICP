import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
// import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDw3OrXmh8Cx_yniLbNkb7bGk606whAo2A",
  authDomain: "rentspace-e58b7.firebaseapp.com",
  projectId: "rentspace-e58b7",
  storageBucket: "rentspace-e58b7.appspot.com",
  messagingSenderId: "405210281368",
  appId: "1:405210281368:web:496f7835fe8bc7d86d27ed",
  measurementId: "G-EEJRRM7PL6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// export const db = getFirestore(app);