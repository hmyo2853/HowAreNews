import ToolTip from "../tooltip/ToolTip";
import { useForm } from "react-hook-form";
// import { useFormContext } from "react-hook-form";

/** 로그인 컴포넌트 */
const SignIn = (props: any) => {
  const { getValues, register, watch } = useForm();
  console.log("리렌더");
  return (
    <>
      <h2>
        로그인
        <ToolTip />
      </h2>
      <input
        type="email"
        placeholder="이메일"
        id="signInEmail"
        required
        {...register("signInEmail", {
          required: true,
          pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          onChange: (e) => console.log(e.target.value),
        })}
      />
      <input
        type="password"
        placeholder="비밀번호"
        id="signInPwd"
        required
        {...register("signInPwd", {
          required: true,
          minLength: 6,
          onChange: (e) => console.log(e.target.value),
        })}
      />
    </>
  );
};

export default SignIn;
