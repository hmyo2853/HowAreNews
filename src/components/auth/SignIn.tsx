import { useState } from "react";
import ToolTip from "../tooltip/ToolTip";

/** 로그인 컴포넌트 */
const SignIn = (props: any) => {
  const [signinEmail, setSignInEmail] = useState<string>("");
  const [signinPwd, setSignInPwd] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target.id;
    const value = e.target.value;
    // email input change
    if (target === "email") {
      // 특수문자 @._-  + 알파벳만 허용
      setSignInEmail(value);
    } else if (target === "password") {
      // password input change
      setSignInPwd(value);
    }
    props.propsFn(signinEmail, signinPwd);
  };

  return (
    <>
      <h2>
        로그인
        <ToolTip />
      </h2>
      <input
        type="email"
        placeholder="이메일"
        id="email"
        onChange={onChange}
        required
      />
      <input
        type="password"
        placeholder="비밀번호"
        id="password"
        onChange={onChange}
        required
      />
    </>
  );
};

export default SignIn;
