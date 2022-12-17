// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database" // this is a copy-paste===========
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDC7VamoBVTHEeLwdUHmTvQYmsL5HtQCWk", // 別人知道了你的database會被盜用
    authDomain: "ntut-web-test-001.firebaseapp.com",
    databaseURL: "https://ntut-web-test-001-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ntut-web-test-001",
    storageBucket: "ntut-web-test-001.appspot.com",
    messagingSenderId: "790866194950",
    appId: "1:790866194950:web:2e4e94547e162a423d4987",
    measurementId: "G-NXD827LS0C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const database = getDatabase(app); // how to access database==========