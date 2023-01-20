import styles from "./TopBtn.module.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

export const TopBtn = () => {
  return (
    <>
      <div className={styles.TopBtn}>
        <FontAwesomeIcon icon={faArrowUp} />
      </div>
    </>
  );
};
