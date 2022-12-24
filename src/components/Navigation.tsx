import { Button } from "@mui/material";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import Navi from "./Navi";
import styles from "./Navigation.module.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";

// header
const Navigation = () => {
  // user data
  const [_object, _setObjcet] = useState<User | null>(null);
  // set name, email
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isGithub, setIsGithub] = useState<boolean | null>(null);
  const [isGoogle, setIsGoogle] = useState<boolean | null>(null);

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
    if (_object?.providerData[0].providerId === "github.com") {
      setIsGithub(true);
    } else if (_object?.providerData[0].providerId === "google.com") {
      setIsGoogle(true);
    }
  }, [_object]);

  console.log(_object);

  return (
    <div className={styles.Navigation}>
      <div className={styles.User__Link}>
        <Link to="/">
          <img src="../src/assets/header_logo.png" />
        </Link>
        {isGoogle ? (
          <FontAwesomeIcon icon={faGoogle} />
        ) : isGithub ? (
          <FontAwesomeIcon icon={faGithub} />
        ) : null}
        <span>
          <span>{name}</span> 님, 반갑습니다.
        </span>
        {isGoogle || isGithub ? null : <span>로그인 계정 : {email}</span>}
        <Button variant="text" onClick={onLogOut}>
          로그아웃
        </Button>
        <Navi children={"홈"} to={"/"} />
        <Navi children={"비즈니스"} to={"/business"} />
        <Navi children={"엔터"} to={"/entertainment"} />
        <Navi children={"건강"} to={"/health"} />
        <Navi children={"과학"} to={"/science"} />
        <Navi children={"스포츠"} to={"/sports"} />
        <Navi children={"IT · 기술"} to={"/technology"} />
      </div>
      {/** hidden navi */}
      <div className={styles.Mo__Navi}>
        <Link to="/">
          <img src="../src/assets/main_logo.png" />
        </Link>
        <select name="" id="">
          <option value="홈">홈</option>
          <option value="비즈니스">비즈니스</option>
          <option value="엔터">엔터</option>
          <option value="건강">건강</option>
          <option value="과학">과학</option>
          <option value="스포츠">스포츠</option>
          <option value="IT · 기술"></option>
        </select>
      </div>
    </div>
  );
};
export default Navigation;
