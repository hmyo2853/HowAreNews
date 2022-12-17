import { Button } from "@mui/material";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useQuery } from "react-query";
import React from "react";

// 로그인 이증 후 화면
const Home = () => {
  const [name, setName] = useState<User | null>(null);
  const navigate = useNavigate();
  const onLogOut = () => {
    auth.signOut();
    navigate("/");
  };

  // 로그인 중일떄 정보 출력
  const getAuthState = async () => {
    auth.onAuthStateChanged((user) => {
      setName(user);
    });
  };

  useEffect(() => {
    getAuthState();
  }, []);

  return (
    <>
      {name && (
        <>
          <h2>{name?.displayName} 님, 반갑습니다.</h2>
          <h3>로그인 계정 : {name?.email}</h3>
        </>
      )}
      <Button variant="outlined" onClick={onLogOut}>
        Log Out
      </Button>
    </>
  );
};
export default Home;
