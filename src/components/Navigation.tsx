import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { UserData } from "../howarenews";
import Navi from "./Navi";
import styles from "./Navigation.module.sass";

// header
const Navigation = ({ name, email }: UserData) => {
  const onLogOut = () => {
    auth.signOut();
  };

  return (
    <div className={styles.Navigation}>
      <Link to="/">
        <img src="../src/assets/header_logo.png" width="100px" />
      </Link>
      <>
        <h2>{name} 님, 반갑습니다.</h2>
        <h3>로그인 계정 : {email}</h3>
      </>
      <Button variant="text" onClick={onLogOut}>
        로그아웃
      </Button>
      <Navi children={"비즈니스"} to={"/business"}></Navi>
      <Navi children={"엔터"} to={"/entertainment"}></Navi>
      <Navi children={"건강"} to={"/health"}></Navi>
      <Navi children={"과학"} to={"/science"}></Navi>
      <Navi children={"스포츠"} to={"/sports"}></Navi>
      <Navi children={"테크놀로지"} to={"/technology"}></Navi>
    </div>
  );
};
export default Navigation;
