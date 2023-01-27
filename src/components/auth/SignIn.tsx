import { useState } from "react";

/** 로그인 컴포넌트 */
const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target.id;
    const value = e.target.value;
    // email input change
    if (target === "email") {
      // 특수문자 @._-  + 알파벳만 허용
      setEmail(value);
    } else if (target === "password") {
      // password input change
      setPwd(value);
    } else if (target === "name") {
      setName(value);
    }
  };
  return (
    <>
      <h2>로그인</h2>
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

export default SignIn;
