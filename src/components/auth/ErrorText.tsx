import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./ErrorText.module.sass";

interface ErrorTextProps {
  text: string;
}

const ErrorText = (props: ErrorTextProps) => {
  return (
    <div className={style.ErrorText}>
      {props.text.length !== 0 ? (
        <FontAwesomeIcon icon={faCircleExclamation} />
      ) : null}
      {props.text}
    </div>
  );
};

export default ErrorText;
