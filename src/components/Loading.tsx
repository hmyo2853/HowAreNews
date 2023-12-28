import styles from "./Loading.module.sass";
import loadingSvg from "../assets/spinner-solid.svg";

export function Loading() {
  return (
    <>
      <div className={styles.Loading}>
        <img src={loadingSvg} style={{ width: "3rem" }} />
        <div>Loading...</div>
      </div>
    </>
  );
}
