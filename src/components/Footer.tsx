import styles from "./Footer.module.sass";

export default function Footer () {
  return(
    <div className={styles.Footer}>
      <div className={styles.Bar}></div>
      <div style={{margin: "2rem 0 4rem 0"}}><a href="https://github.com/hmyo2853/HowAreNews" target="_blank">GITHUB</a>|<a href="https://generated-silence-3bf.notion.site/FE-db5937393afa4fd1804f545bbc4e6913" target="_blank">NOTION</a>|<a href="mailto:hmyo2853@gmail.com" style={{cursor: "pointer"}}>문의하기</a></div>
      <div style={{margin: "2rem 0 4rem 0"}}>Copyright all right deserved @hmyo2853</div>
    </div>
  )
}