import styles from "./TopBtn.module.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

export const TopBtn = () => {
  const toTopScrollHandler = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.TopBtn} onClick={toTopScrollHandler}>
      <FontAwesomeIcon icon={faArrowUp} />
    </div>
  );
};
