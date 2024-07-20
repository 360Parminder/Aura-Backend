// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbm9d_eswtzfL9GW6uiQcvKi96rLt0LRs",
  authDomain: "slugplay-314e4.firebaseapp.com",
  projectId: "slugplay-314e4",
  storageBucket: "slugplay-314e4.appspot.com",
  messagingSenderId: "1098391131930",
  appId: "1:1098391131930:web:d4bc32a88ef7c4b44f3ea3",
  measurementId: "G-20L104RV5Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);




