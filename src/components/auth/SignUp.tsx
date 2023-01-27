import { useState } from "react";

/** 회원가입 컴포넌트 */
const SignUp = (props: any) => {
  const [signupEmail, setSignupEmail] = useState<string>("");
  const [signupPwd, setSignupPwd] = useState<string>("");
  const [signupName, setSignupName] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target.id;
    const value = e.target.value;
    // email input change
    if (target === "email") {
      // 특수문자 @._-  + 알파벳만 허용
      setSignupEmail(value);
    } else if (target === "password") {
      // password input change
      setSignupPwd(value);
    } else if (target === "name") {
      setSignupName(value);
    }
    props.propsFn(signupEmail, signupPwd, signupName);
  };

  return (
    <>
      <h2>회원가입</h2>
      <input
        type="text"
        placeholder="이름 *"
        id="name"
        onChange={onChange}
        required
      />
      <input
        type="email"
        placeholder="이메일 *"
        id="email"
        onChange={onChange}
        required
      />
      <input
        type="password"
        placeholder="비밀번호 *"
        id="password"
        onChange={onChange}
        required
      />
    </>
  );
};

export default SignUp;
