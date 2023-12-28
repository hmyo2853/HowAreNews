import {
  AuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  User,
} from "firebase/auth";
import React, { useState } from "react";
import { auth, Providers } from "../firebase";
import styles from "./Auth.module.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import logoPng from "../assets/main_logo.png";
import SignUp from "../components/auth/SignUp";
import SignIn from "../components/auth/SignIn";
import ErrorText from "../components/auth/ErrorText";

const Auth = () => {
  const [newAccount, setNewAccount] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [checkErr, setCheckErr] = useState<string>("");

  /** 하위 컴포넌트 signin, signup에서 email, name, pwd string을 받아오는 함수 */
  const setAuthDataFunction = (email: string, pwd: string, name?: string) => {
    setEmail(email);
    setPwd(pwd);
    if (name !== undefined) {
      setName(name);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const regex = new RegExp(
      "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
    );
    try {
      // state 가 newAccount 라면
      if (newAccount) {
        await createUserWithEmailAndPassword(auth, email, pwd);
        await updateProfile(auth.currentUser as User, {
          displayName: name,
        });
      } else {
        await signInWithEmailAndPassword(auth, email, pwd);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        // 출력 에러 분기
        if (name === "" && newAccount) {
          return setCheckErr("이름를 입력해주세요.");
        } else if (!regex.test(email)) {
          return setCheckErr("올바른 이메일 주소를 입력해주세요.");
        } else if (pwd === "") {
          return setCheckErr("비밀번호를 입력해주세요.");
        } else if (pwd.length < 6) {
          return setCheckErr("비밀번호를 6자 이상 입력해주세요.");
        }
        if (
          error.message === "Firebase: Error (auth/wrong-password)." ||
          error.message === "Firebase: Error (auth/user-not-found)." ||
          error.message === "Firebase: Error (auth/wrong-password)."
        ) {
          return setCheckErr("이메일과 비밀번호를 확인해주세요.");
        }
        if (error.message === "Firebase: Error (auth/invalid-email).") {
          return setCheckErr("이미 가입된 계정입니다. 로그인 해주세요.");
        }
      }
    }
  };

  const onSocialLogin = async (provider: AuthProvider) => {
    if (error !== "") setError("");
    const data = await signInWithPopup(auth, provider);
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
    // error 문구 초기화
    setCheckErr("");
  };

  return (
    <div className={styles.Auth}>
      <div>
        <img src={logoPng} width="320px" />
      </div>
      <form>
        {newAccount ? (
          <SignUp propsFn={setAuthDataFunction} />
        ) : (
          <SignIn propsFn={setAuthDataFunction} />
        )}
        <button onClick={onSubmit}>{newAccount ? "회원가입" : "로그인"}</button>
      </form>
      <ErrorText text={checkErr} />
      <span className={styles.Toggle} onClick={toggleAccount}>
        {newAccount ? "기존 회원 로그인" : "새로 오셨나요?"}
      </span>
      {/* 가입 인원이 없어 삭제
      <div className={styles.Btn}>
        <button
          className={styles.google}
          onClick={() => onSocialLogin(Providers.google)}
          name="google"
        >
          <FontAwesomeIcon color="#ee3e21" icon={faGoogle} size="2x" />
        </button>
        <button
          className={styles.github}
          onClick={() => onSocialLogin(Providers.github)}
          name="github"
        >
          <FontAwesomeIcon color="#222" icon={faGithub} size="2x" />
        </button>
      </div> */}
    </div>
  );
};

export default Auth;
