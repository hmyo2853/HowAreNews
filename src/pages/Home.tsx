import { useNavigate } from "react-router-dom";
import { authService } from "../firebase";

export default function Home() {
  const handleLogOut = () => {
    authService.signOut();
    const navigate = useNavigate();
    navigate("/login", { replace: true });
  };
  return (
    <>
      <p>Welcome!</p>
      <button onClick={handleLogOut}>Log Out</button>
    </>
  );
}
