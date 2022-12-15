import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

// 로그인 이증 후 화면
const Home = () => {
  const [name, setName] = useState<User | null>(null);
  const navigate = useNavigate();
  const onLogOut = () => {
    auth.signOut();
    navigate("/");
  };

  useEffect(() => {
    // 로그인 중일떄 정보 출력
    auth.onAuthStateChanged((user: User | null) => {
      setName(user);
    });
  }, []);

  return (
    <>
      <span>Home</span>
      <button onClick={onLogOut}>Log Out</button>
      <div>{name?.displayName}</div>
      <div>{name?.email}</div>
    </>
  );
};
export default Home;
