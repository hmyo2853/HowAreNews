import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  User,
} from "firebase/auth";
import { ChangeEvent, FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { authService } from "../firebase";

const Signin = () => {
  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPws, setRegisterPws] = useState<string>("");
  const [registerName, setRegisterName] = useState<string>("");

  const register = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        authService,
        registerEmail,
        registerPws
      );
      await updateProfile(authService.currentUser as User, {
        displayName: registerName,
      });
    } catch (error) {
      throw new Error(`Error type :: ${error}`);
    }
  };
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const navigate = Navigate;
  if (currentUser === null) return navigate("/", true);
  console.log(currentUser?.email, currentUser?.displayName);

  return (
    <>
      <form onSubmit={register}>
        <span>이름</span>
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setRegisterName(e.target.value);
          }}
        />
        <span>이메일</span>
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setRegisterEmail(e.target.value);
          }}
          type={"email"}
          placeholder={"이메일"}
          required
        />
        <span>비밀번호</span>
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setRegisterPws(e.target.value);
          }}
          type={"password"}
          required
        />
        <input type={"submit"} value={"Sign in"} />
      </form>
    </>
  );
};

export default Signin;
