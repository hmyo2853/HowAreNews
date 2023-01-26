import { NavigateFunction } from "react-router-dom";
import { auth } from "../../firebase";

/** logout module */
export function LogOut(navigate: NavigateFunction) {
  auth.signOut();
  navigate("/");
}
