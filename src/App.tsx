import "./App.sass";
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
import { User } from "firebase/auth";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // user data
  const [_object, _setObjcet] = useState<User | null>(null);
  // set name, email
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // 로그인 중일떄 정보 출력
  const getAuthState = async () => {
    let __object: User | null = null;
    let _worker_id: NodeJS.Timer | null = null;

    auth.onAuthStateChanged((user) => {
      __object = user;
    });

    _worker_id = setInterval(() => {
      if (__object?.displayName) {
        _worker_id && clearInterval(_worker_id);
        _setObjcet(__object);
        setLoading(false);
      }
    }, 50);
  };

  useEffect(() => {
    getAuthState();
    setName(_object?.displayName || null);
    setEmail(_object?.email || null);
  }, [_object]);

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
  if (loading) return <Loading />;
  if (isLoading) return <Loading />;
  return (
    <>
      {isLoggedIn ? (
        <BrowserRouter>
          <Navigation name={name} email={email} />
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
    </>
  );
}
