import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import styles from "./Auth.module.sass";
import logoPng from "../assets/main_logo.png";
import SignUp from "../components/auth/SignUp";
import SignIn from "../components/auth/SignIn";
import ErrorText from "../components/auth/ErrorText";
import { useForm } from "react-hook-form";
// import { useFormContext } from "react-hook-form";

const Auth = () => {
  const [isLoginPage, setIsLoginPage] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [checkErr, setCheckErr] = useState<string>("");
  const { getValues, register, watch, handleSubmit } = useForm({
    mode: "onSubmit",
    values: {
      signInEmail: "",
      signInPwd: "",
    },
  });

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
      // state 가 SignUp 라면
      if (isLoginPage) {
        await createUserWithEmailAndPassword(auth, email, pwd);
        await updateProfile(auth.currentUser as User, {
          displayName: name,
        });
      } else {
        await signInWithEmailAndPassword(auth, email, pwd);
      }
    } catch (error) {
      if (error instanceof Error) {
        // 출력 에러 분기
        if (name === "" && isLoginPage) {
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

  const onSubmitHandler = (data: any) => {
    console.log(data);
  };
  // 소셜 로그인 사용하지 않아서 삭제
  // const onSocialLogin = async (provider: AuthProvider) => {
  //   if (error !== "") setError("");
  //   const data = await signInWithPopup(auth, provider);
  // };

  const toggleAccount = () => {
    setIsLoginPage((prev) => !prev);
    // error 문구 초기화
    setCheckErr("");
  };

  return (
    <div className={styles.Auth}>
      <div>
        <img src={logoPng} width="320px" />
      </div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        {isLoginPage ? (
          <SignIn propsFn={setAuthDataFunction} />
        ) : (
          <SignUp propsFn={setAuthDataFunction} />
        )}
        <button type="submit">{isLoginPage ? "로그인" : "회원가입"}</button>
      </form>
      <ErrorText text={checkErr} />
      <span className={styles.Toggle} onClick={toggleAccount}>
        {isLoginPage ? "새로 오셨나요?" : "기존 이메일로 로그인"}
      </span>
      {/* 가입 인원이 없어 소셜 로그인 삭제
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
