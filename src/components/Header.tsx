import { Button } from "@mui/material";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

// 로그인 이증 후 헤더
const Header = () => {
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
  }, [name]);

  return (
    <>
      <span>Home</span>
      {name !== null ? (
        <>
          <h2>{name.displayName} 님, 반갑습니다.</h2>
          <h3>로그인 계정 : {name.email}</h3>
        </>
      ) : null}
      <Button variant="outlined" onClick={onLogOut}>
        Log Out
      </Button>
    </>
  );
};
export default Header;
