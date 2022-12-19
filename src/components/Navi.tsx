import { Link } from "react-router-dom";

interface NaviText {
  to: string;
  children: string;
}

const Navi = ({ to, children }: NaviText) => {
  return <Link to={to}>{children}</Link>;
};

export default Navi;
