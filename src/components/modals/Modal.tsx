import styles from "../modals/Modal.module.sass";
import Navi from "../Navi";

interface PropsType {
  setModalOpen: (e: boolean) => void;
}
function ModalBasic({ setModalOpen }: PropsType) {
  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <button className={styles.close} onClick={closeModal}>
        X
      </button>
      <Navi onClick={closeModal} children={"홈"} to={"/"} />
      <Navi onClick={closeModal} children={"비즈니스"} to={"/business"} />
      <Navi onClick={closeModal} children={"엔터"} to={"/entertainment"} />
      <Navi onClick={closeModal} children={"건강"} to={"/health"} />
      <Navi onClick={closeModal} children={"과학"} to={"/science"} />
      <Navi onClick={closeModal} children={"스포츠"} to={"/sports"} />
      <Navi onClick={closeModal} children={"IT · 기술"} to={"/technology"} />
    </div>
  );
}
export default ModalBasic;
