import { NavLink } from "react-router-dom";
import styles from "../components/Navi.module.sass";

interface NaviText {
  to: string;
  children: string;
}

const Navi = ({ to, children }: NaviText) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? styles.LinkActive : "")}
    >
      {children}
    </NavLink>
  );
};

export default Navi;
