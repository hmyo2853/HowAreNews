// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup, //google 로그인을 팝업창에 띄우기 위해
  GoogleAuthProvider, //google login 기능
  signInWithEmailAndPassword, // email 로그인
  createUserWithEmailAndPassword, //email 회원가입
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUt8Z_sS0DnpzFuQ7cqZTDmuhIrlOPaGw",
  authDomain: "howarenews.firebaseapp.com",
  projectId: "howarenews",
  storageBucket: "howarenews.appspot.com",
  messagingSenderId: "891407157017",
  appId: "1:891407157017:web:e9871ff30e5624ecb0a788",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const authService = getAuth();

interface Email {
  email: string;
  password: string;
}

// Email 로그인
const signupEmail = ({ email, password }: Email) => {
  return createUserWithEmailAndPassword(authService, email, password);
};

// Email 회원가입
const loginEmail = ({ email, password }: Email) => {
  return signInWithEmailAndPassword(authService, email, password);
};

export { app, authService, loginEmail, signupEmail };
