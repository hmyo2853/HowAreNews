import { createUserWithEmailAndPassword } from "firebase/auth";
import { ChangeEvent, FormEvent, useState } from "react";
import { authService } from "../firebase";

const Login = () => {
  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPws, setRegisterPws] = useState<string>("");

  const register = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(
        authService,
        registerEmail,
        registerPws
      );
      console.log(user);
    } catch (error) {
      throw new Error(`Error type :: ${error}`);
    }
  };

  return (
    <>
      <form onSubmit={register}>
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

export default Login;
