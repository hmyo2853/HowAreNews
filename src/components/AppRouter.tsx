import { User } from "firebase/auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

interface LoggedIn {
  isLoggedIn: boolean;
}

const AppRouter = ({ isLoggedIn }: LoggedIn) => {
  return (
    <BrowserRouter>
      {isLoggedIn ? (
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Auth />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default AppRouter;
