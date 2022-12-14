import "./App.sass";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import Signin from "./components/Signin";
import { useState } from "react";
import { authService } from "./firebase";
import AppRouter from "./pages/AppRouter";
import { User } from "firebase/auth";

export default function App() {
  const [init, setInit] = useState<boolean>(false);
  const [isLoggIn, setIsLoggIn] = useState(authService.currentUser as User);
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggIn} /> : <h3>Loading.........</h3>}
    </>
  );
}
