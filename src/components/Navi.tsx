import { NavLink } from "react-router-dom";
import styles from "../components/Navi.module.sass";

interface NaviText {
  onClick?: () => void;
  to: string;
  children: string;
}

const Navi = ({ onClick, to, children }: NaviText) => {
  return (
    <NavLink
      onClick={onClick}
      to={to}
      className={({ isActive }) => (isActive ? styles.LinkActive : "")}
    >
      {children}
    </NavLink>
  );
};

export default Navi;
