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
  return (
    <>
      <Card sx={{ minWidth: 320 }} className={styles.NewsCard}>
        <CardActionArea href={data.url} target="_blank">
          <CardMedia
            sx={{ maxHeight: 200 }}
            component="img"
            image={
              data.urlToImage === null
                ? "../src/assets/null_img.png"
                : data.urlToImage
            }
            alt={data.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {data.source.name === "YouTube" ? (
                <FontAwesomeIcon color="#ff0000" icon={faYoutube} size="1x" />
              ) : null}
              {data.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.publishedAt}
              <br />
              {data.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default NewsCard;
