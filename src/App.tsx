import "./App.sass";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import Auth from "./routes/Auth";
import Home from "./routes/Home";
import Loading from "./components/Loading";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    });
  });
  if (isLoading) return <Loading />;
  return isLoggedIn ? <Home /> : <Auth />;
}
