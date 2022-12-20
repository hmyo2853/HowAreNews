import { useEffect, useState } from "react";
import { auth } from "./firebase";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Loading from "./components/Loading";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Business,
  Entertainment,
  Health,
  Science,
  Sports,
  Technology,
} from "./components/category/Category";
import Navigation from "./components/Navigation";
import styles from "./App.module.sass";

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

  return (
    <div className={styles.App}>
      {isLoggedIn ? (
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/business" element={<Business />} />
            <Route path="/entertainment" element={<Entertainment />} />
            <Route path="/health" element={<Health />} />
            <Route path="/science" element={<Science />} />
            <Route path="/sports" element={<Sports />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/*" element={<Auth />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}
