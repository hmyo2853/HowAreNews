import { Button, TextField } from "@mui/material";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import styles from "../Auth.module.sass";

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
      setEmail(value);
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

  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <div className={styles.Auth}>
      {newAccount ? (
        <>
          <h1>회원가입</h1>
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
          <h1>로그인</h1>
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
        {newAccount ? "회원가입" : "로그인"}{" "}
      </Button>
      <Button
        variant="outlined"
        size="large"
        onClick={toggleAccount}
        disableElevation
      >
        {newAccount ? "기존 회원 로그인" : "새로 오셨나요?"}
      </Button>
      <div>{error}</div>
      {/* <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
      </div> */}
    </div>
  );
};

export default Auth;
