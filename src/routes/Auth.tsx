import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
  UserCredential,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";

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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    <div>
      <form onSubmit={onSubmit}>
        {newAccount ? (
          <>
            <h1>회원가입</h1>
            <span>이름</span>
            <input
              name="name"
              type="text"
              required
              value={name}
              onChange={onChange}
            />
            <span>이메일</span>
            <input
              name="email"
              type="text"
              required
              value={email}
              onChange={onChange}
            />
            <span>비밀번호</span>
            <input
              name="password"
              type="password"
              required
              value={pwd}
              onChange={onChange}
            />
          </>
        ) : (
          <>
            <h1>로그인</h1>
            <span>이메일</span>
            <input
              name="email"
              type="text"
              required
              value={email}
              onChange={onChange}
            />
            <span>비밀번호</span>
            <input
              name="password"
              type="password"
              required
              value={pwd}
              onChange={onChange}
            />
          </>
        )}
        <input type="submit" value={newAccount ? "회원가입" : "로그인"} />
        <span onClick={toggleAccount}>
          {newAccount ? "기존 계정이 있으시다면!" : "아직 계정이 없으신가요?"}
        </span>
      </form>
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
