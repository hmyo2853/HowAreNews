import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
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
  return (
    <>
      <Card sx={{ minWidth: 320 }} className={styles.NewsCard}>
        <CardActionArea href={data.url} target="_blank">
          <CardMedia
            sx={{ height: 160 }}
            component="img"
            image={
              !data.urlToImage ? "../src/assets/null_img.png" : data.urlToImage
            }
            alt={data.title}
          />
          <CardContent>
            <Typography gutterBottom variant="subtitle1" component="div">
              {data.source.name === "YouTube" ? (
                <FontAwesomeIcon
                  className={styles.YoutubeIcon}
                  icon={faYoutube}
                />
              ) : null}
              {data.title.length > 50
                ? data.title.slice(0, 48) + "..."
                : data.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.publishedAt}
              <br />
              {!data.description
                ? null
                : checkString(data.description) === false
                ? null
                : data.description.length > 60
                ? data.description.slice(0, 58) + "..."
                : data.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default NewsCard;
