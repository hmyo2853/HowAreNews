import { Button, TextField } from "@mui/material";
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

const Auth = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [newAccount, setNewAccount] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    // email input change
    if (name === "email") {
      // 특수문자 @._-  + 알파벳만 허용
      setEmail(value.replace(/[^A-Za-z@._-]/gi, ""));
    } else if (name === "password") {
      // password input change
      setPwd(value);
    } else if (name === "name") {
      setName(value);
    }
  };

  const onSubmit = async () => {
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

  const onSocialLogin = async (provider: AuthProvider) => {
    if (error !== "") setError("");
    const data = await signInWithPopup(auth, provider);
    console.log(data);
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
  console.log(newAccount);
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
          />

          <TextField
            name="email"
            label="이메일"
            variant="outlined"
            type="email"
            required
            value={email}
            onChange={onChange}
          />

          <TextField
            name="password"
            label="비밀번호"
            variant="outlined"
            type="password"
            required
            value={pwd}
            onChange={onChange}
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
          />

          <TextField
            name="password"
            label="비밀번호"
            variant="outlined"
            type="password"
            required
            value={pwd}
            onChange={onChange}
          />
        </>
      )}
      <Button
        variant="contained"
        size="large"
        onClick={onSubmit}
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
      <div>{error}</div>
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
