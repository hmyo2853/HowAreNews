import { Button } from "@mui/material";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { UserData } from "../howarenews";
import Navi from "./Navi";
import styles from "./Navigation.module.sass";

// header
const Navigation = () => {
  // user data
  const [_object, _setObjcet] = useState<User | null>(null);
  // set name, email
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const onLogOut = () => {
    auth.signOut();
  };

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
      }
    }, 50);
  };

  useEffect(() => {
    getAuthState();
    setName(_object?.displayName || null);
    setEmail(_object?.email || null);
  }, [_object]);
  console.log(_object);

  return (
    <div className={styles.Navigation}>
      <Link to="/">
        <img src="../src/assets/header_logo.png" width="100px" />
      </Link>
      <>
        <h2>{name} 님, 반갑습니다.</h2>
        <h3>로그인 계정 : {email}</h3>
      </>
      <Button variant="text" onClick={onLogOut}>
        로그아웃
      </Button>
      <Navi children={"비즈니스"} to={"/business"}></Navi>
      <Navi children={"엔터"} to={"/entertainment"}></Navi>
      <Navi children={"건강"} to={"/health"}></Navi>
      <Navi children={"과학"} to={"/science"}></Navi>
      <Navi children={"스포츠"} to={"/sports"}></Navi>
      <Navi children={"테크놀로지"} to={"/technology"}></Navi>
    </div>
  );
};
export default Navigation;