import { useQuery } from "react-query";
import NewsCard from "../card/NewsCard";
import Loading from "../Loading";
import { fetchNewsData } from "./Category.module";
import styles from "./Category.module.sass";

export default function Entertainment() {
  const fetchEntertainment = async () => {
    const URL =
      "https://newsapi.org/v2/top-headlines?country=kr&category=entertainment&apiKey=fdb223730c9a4641af46ee2787db1614";

    return await fetchNewsData(URL);
  };

  const { data, isLoading } = useQuery("Entertainment", fetchEntertainment);

  if (isLoading) return <Loading />;
  return (
    <div className={styles.Category}>
      <h1>엔터테인먼트</h1>
      {data?.map((_data, i) => (
        <NewsCard key={i} data={_data} />
      ))}
    </div>
  );
}
