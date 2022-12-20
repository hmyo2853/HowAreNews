import { Button, TextField } from "@mui/material";
import {
  AuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  User,
} from "firebase/auth";
import React, { KeyboardEventHandler, useState } from "react";
import { auth, Providers } from "../firebase";
import styles from "./Auth.module.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [newAccount, setNewAccount] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [checkErr, setCheckErr] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    // email input change
    if (name === "email") {
      // 특수문자 @._-  + 알파벳만 허용
      setEmail(value);
    } else if (name === "password") {
      // password input change
      setPwd(value);
    } else if (name === "name") {
      setName(value);
    }
  };

  const onSubmit = async () => {
    const regex = new RegExp(
      "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
    );
    // 출력 에러 분기
    if (name === "" && newAccount) {
      return setCheckErr("이름를 입력해주세요.");
    } else if (
      !regex.test(email) ||
      error == "Firebase: Error (auth/invalid-email)."
    ) {
      return setCheckErr("올바른 이메일 주소를 입력해주세요.");
    } else if (pwd === "") {
      return setCheckErr("비밀번호를 입력해주세요.");
    } else if (pwd.length < 6) {
      return setCheckErr("비밀번호를 6자 이상 입력해주세요.");
    }

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
      }
    }
  };
  console.log(error);

  const onSocialLogin = async (provider: AuthProvider) => {
    if (error !== "") setError("");
    const data = await signInWithPopup(auth, provider);
    console.log(data);
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
    // error 문구 초기화
    setCheckErr("");
  };

  return (
    <div className={styles.Auth}>
      <div>
        <img src="../src/assets/main_logo.png" width="320px" />
      </div>
      {newAccount ? (
        <>
          <h2>회원가입</h2>
          <TextField
            name="name"
            label="이름"
            variant="outlined"
            type="text"
            required
            value={name}
            onChange={onChange}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onSubmit();
              }
            }}
          />

          <TextField
            name="email"
            label="이메일"
            variant="outlined"
            type="email"
            required
            value={email}
            onChange={onChange}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onSubmit();
              }
            }}
          />

          <TextField
            name="password"
            label="비밀번호"
            variant="outlined"
            type="password"
            required
            value={pwd}
            onChange={onChange}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onSubmit();
              }
            }}
          />
        </>
      ) : (
        <>
          <h2>로그인</h2>
          <TextField
            name="email"
            label="이메일"
            variant="outlined"
            type="email"
            required
            value={email}
            onChange={onChange}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onSubmit();
              }
            }}
          />

          <TextField
            name="password"
            label="비밀번호"
            variant="outlined"
            type="password"
            required
            value={pwd}
            onChange={onChange}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onSubmit();
              }
            }}
          />
        </>
      )}
      <Button
        variant="contained"
        size="large"
        onClick={onSubmit}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            onSubmit();
          }
        }}
        disableElevation
      >
        {newAccount ? "회원가입" : "로그인"}
      </Button>
      <Button
        variant="text"
        size="large"
        onClick={toggleAccount}
        disableElevation
      >
        {newAccount ? "기존 회원 로그인" : "새로 오셨나요?"}
      </Button>
      <div>{checkErr}</div>
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
      </div>
    </div>
  );
};

export default Auth;
