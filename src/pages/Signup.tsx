import { FormEvent } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-email">Email</label>
        <input id="input-email" type="email" />
        <label htmlFor="input-password">Password</label>
        <input id="input-password" type="password" />
        <button type="submit">Sign up</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </>
  );
}
