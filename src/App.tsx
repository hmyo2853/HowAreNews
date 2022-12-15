import "./App.sass";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import AppRouter from "./components/AppRouter";
import { User } from "firebase/auth";

export default function App() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(true);
    });
  });
  return (
    <>{isLoading ? <AppRouter isLoggedIn={isLoggedIn} /> : "Loading....."}</>
  );
}
