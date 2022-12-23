import { useQuery } from "react-query";
import NewsCard from "../card/NewsCard";
import { Loading } from "../Loading";
import { fetchNewsData } from "./Category.module";
import styles from "./Category.module.sass";

export default function Sports() {
  const fetchSports = async () => {
    const URL =
      "https://newsapi.org/v2/top-headlines?country=kr&category=sports&apiKey=fdb223730c9a4641af46ee2787db1614";

    return await fetchNewsData(URL);
  };

  const { data, isLoading } = useQuery("Sports", fetchSports);

  if (isLoading) return <Loading />;
  return (
    <div className={styles.Category}>
      <h1>스포츠</h1>
      {data?.map((_data, i) => (
        <NewsCard key={i} data={_data} />
      ))}
    </div>
  );
}
