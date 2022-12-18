// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword, // email 로그인
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider, //email 회원가입
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

const auth = getAuth(app);

interface Email {
  email: string;
  password: string;
}

// Email 로그인
const signupEmail = ({ email, password }: Email) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Email 회원가입
const loginEmail = ({ email, password }: Email) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// social 로그인
export const Providers = {
  google: new GoogleAuthProvider(),
  github: new GithubAuthProvider(),
};

export { app, auth, loginEmail, signupEmail };
