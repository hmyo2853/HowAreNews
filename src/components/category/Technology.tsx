import { useQuery } from "react-query";
import NewsCard from "../card/NewsCard";
import { Loading } from "../Loading";
import { fetchNewsData } from "./Category.module";
import styles from "./Category.module.sass";

export default function Technology() {
  const fetchTechnology = async () => {
    const URL =
      "https://api.currentsapi.services/v1/search?language=ko&apiKey=19nC-zjytBaWvOP0fTa1SD3v_7rTSrLQhkh3rSUjMz5orM4v&category=technology";

    return await fetchNewsData(URL);
  };

  const { data, isLoading } = useQuery("Technology", fetchTechnology);

  if (isLoading) return <Loading />;
  return (
    <div className={styles.Category}>
      <div className={styles.CardWrap}>
        <h1>IT · 기술</h1>
        {data?.map((_data, i) => (
          <NewsCard key={i} data={_data} />
        ))}
      </div>
    </div>
  );
}
