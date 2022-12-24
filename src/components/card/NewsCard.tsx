import { PropsWithChildren } from "react";
import { NewsAPI } from "../../howarenews";
import styles from "./NewsCard.module.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

interface GetDataProps {
  data: NewsAPI;
}

const NewsCard = ({ data }: PropsWithChildren<GetDataProps>) => {
  const checkString = (text: string) => {
    for (let i = 0; i < text.length; i++) {
      if (text.charCodeAt(i) === 65533) {
        return false;
      }
    }
  };
  const cardClick = () => {
    window.open(`${data.url}`);
  };
  return (
    <div className={styles.NewsCard} onClick={cardClick}>
      <img
        src={!data.urlToImage ? "../src/assets/null_img.png" : data.urlToImage}
      />
      <div>
        <div className={styles.Title}>
          {data.source.name === "YouTube" ? (
            <FontAwesomeIcon className={styles.YoutubeIcon} icon={faYoutube} />
          ) : null}
          {data.title.length > 40
            ? data.title.slice(0, 40) + "..."
            : data.title}
        </div>
        <div className={styles.Description}>
          {!data.description
            ? null
            : checkString(data.description) === false
            ? null
            : data.description.length > 40
            ? data.description.slice(0, 45) + "..."
            : data.description}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
