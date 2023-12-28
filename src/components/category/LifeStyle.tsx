import { useQuery } from "react-query";
import NewsCard from "../card/NewsCard";
import { Loading } from "../Loading";
import { fetchNewsData } from "./Category.module";
import styles from "./Category.module.sass";

export default function LifeStyle() {
  const fetchLifeStyle = async () => {
    const URL =
      "https://api.currentsapi.services/v1/search?language=ko&apiKey=19nC-zjytBaWvOP0fTa1SD3v_7rTSrLQhkh3rSUjMz5orM4v&category=lifestyle";

    return await fetchNewsData(URL);
  };

  const { data, isLoading } = useQuery("LifeStyle", fetchLifeStyle);
  if (isLoading) return <Loading />;
  return (
    <div className={styles.Category}>
      <div className={styles.CardWrap}>
        <h1>라이프 스타일</h1>
        {data?.map((_data, i) => (
          <NewsCard key={i} data={_data} />
        ))}
      </div>
    </div>
  );
}
