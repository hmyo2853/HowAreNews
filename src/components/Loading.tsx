import styles from "./Loading.module.sass";
export function Loading() {
  return (
    <>
      <div className={styles.Loading}>
        <img src="/src/assets/spinner-solid.svg" style={{ width: "3rem" }} />
        <div>Loading...</div>
      </div>
    </>
  );
}
