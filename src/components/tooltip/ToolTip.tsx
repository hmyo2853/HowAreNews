import styles from "./ToolTip.module.sass";
import tooltipSvg from "../../assets/tooltip_icon.svg";
import { useState } from "react";

const ToolTip = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {isOpen && (
        <div className={styles.tooltip}>
          테스트 계정
          <br />
          ID : admin@test.com <br />
          PW : test@@
        </div>
      )}
      <img
        onMouseOver={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        src={tooltipSvg}
        style={{ marginLeft: "0.5rem", width: "1.4rem" }}
      />
    </>
  );
};

export default ToolTip;
