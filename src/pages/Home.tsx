import { useQuery } from "react-query";
import NewsCard from "../components/card/NewsCard";
import { fetchNewsData } from "../components/category/Category.module";
import styles from "../components/category/Category.module.sass";
import Loading from "../components/Loading";

const Home = () => {
  const fetchHome = async () => {
    const URL =
      "https://newsapi.org/v2/top-headlines?country=kr&apiKey=fdb223730c9a4641af46ee2787db1614";

    return await fetchNewsData(URL);
  };

  const { data, isLoading } = useQuery("Home", fetchHome);

  if (isLoading) return <Loading />;

  return (
    <div className={styles.Category}>
      <h1>홈</h1>
      {data?.map((_data, i) => (
        <NewsCard key={i} data={_data} />
      ))}
    </div>
  );
};

export default Home;
