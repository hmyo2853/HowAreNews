import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import styles from "../modals/Modal.module.sass";
import Navi from "../Navi";

interface PropsType {
  setModalOpen: (e: boolean) => void;
  name: string | null;
}
function ModalBasic({ setModalOpen, name }: PropsType) {
  const navigate = useNavigate();
  // 모달 끄기
  const closeModal = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setModalOpen(false);
  };
  const onLogOut = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <button className={styles.close} onClick={closeModal}>
          <FontAwesomeIcon icon={faClose} size="2x" />
        </button>
        <div className={styles.UserData}>
          <span style={{ marginBottom: "1rem" }}>
            <span style={{ fontWeight: "bold" }}>{name}</span> 님, 반갑습니다.
          </span>
          <button className={styles.ModalBtn} onClick={onLogOut}>
            로그아웃
          </button>
        </div>
        <div className={styles.Bar}></div>
        <Navi onClick={closeModal} children={"홈"} to={"/"} />
        <Navi onClick={closeModal} children={"라이프"} to={"/lifestyle"} />
        <Navi onClick={closeModal} children={"정치"} to={"/politics"} />
        <Navi onClick={closeModal} children={"건강"} to={"/health"} />
        <Navi onClick={closeModal} children={"금융"} to={"/finance"} />
        <Navi onClick={closeModal} children={"스포츠"} to={"/sports"} />
        <Navi onClick={closeModal} children={"IT · 기술"} to={"/technology"} />
      </div>
      <div className={styles.Background}></div>
    </div>
  );
}
export default ModalBasic;
