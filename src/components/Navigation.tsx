import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import Navi from "./Navi";
import styles from "./Navigation.module.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import Modal from "./modals/Modal";
import { faBars } from "@fortawesome/free-solid-svg-icons";

// header
const Navigation = () => {
  // user data
  const [_object, _setObjcet] = useState<User | null>(null);
  // set name, email
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isGithub, setIsGithub] = useState<boolean | null>(null);
  const [isGoogle, setIsGoogle] = useState<boolean | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };

  const onLogOut = () => {
    auth.signOut();
  };

  if (modalOpen === true) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

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

  return (
    <div className={styles.Navigation}>
      <div className={styles.User__Link}>
        <Link to="/">
          <img src="../src/assets/header_logo.png" />
        </Link>
        <div className={styles.UserData}>
          {isGoogle ? (
            <FontAwesomeIcon icon={faGoogle} />
          ) : isGithub ? (
            <FontAwesomeIcon icon={faGithub} />
          ) : null}
          <span>
            <span>{name}</span> 님, 반갑습니다.
          </span>
          {isGoogle || isGithub ? null : <span>로그인 계정 : {email}</span>}
          <button onClick={onLogOut}>로그아웃</button>
        </div>
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
        <div>
          <Link to="/">
            <img src="../src/assets/main_logo.png" />
          </Link>
          <button onClick={showModal}>
            <FontAwesomeIcon icon={faBars} size="2x" />
          </button>
          {modalOpen && <Modal setModalOpen={setModalOpen} name={name} />}
        </div>
      </div>
    </div>
  );
};
export default Navigation;
