import { User } from "firebase/auth";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Home from "./Home";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
          <>
            {/* 로그인 중이라면 path는 무조건 home 으로 */}
            <Route path="/" element={<Home />} />
          </>
        ) : (
          <>
            {/* 로그아웃 중이라면 path는 무조건 login 으로 */}
            <Route path="/" element={<Login />} />
          </>
        )}
      </Routes>
    </Router>
  );
};
export default AppRouter;
