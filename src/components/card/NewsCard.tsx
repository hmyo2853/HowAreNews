import { PropsWithChildren, SyntheticEvent } from "react";
import { NewsAPI } from "../../howarenews";
import styles from "./NewsCard.module.sass";
import defaultImg from "../../assets/null_img.png";

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

  // default img
  const addDefaultImg = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = defaultImg;
  };

  return (
    <div className={styles.NewsCard} onClick={cardClick}>
      <img
        src={data.image.slice(0, 2) === "//" ? "http" + data.image : data.image}
        onError={addDefaultImg}
      />
      <div>
        <div className={styles.Title}>
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
