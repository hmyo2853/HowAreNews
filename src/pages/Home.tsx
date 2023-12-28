import { useQuery } from "react-query";
import NewsCard from "../components/card/NewsCard";
import { fetchNewsData } from "../components/category/Category.module";
import styles from "../components/category/Category.module.sass";
import { Loading } from "../components/Loading";

const Home = () => {
  const fetchHome = async () => {
    const URL =
      "https://api.currentsapi.services/v1/latest-news?language=ko&apiKey=19nC-zjytBaWvOP0fTa1SD3v_7rTSrLQhkh3rSUjMz5orM4v";

    return await fetchNewsData(URL);
  };

  const { data, isLoading } = useQuery("Home", fetchHome);

  if (isLoading) return <Loading />;

  return (
    <div className={styles.Category}>
      <div className={styles.CardWrap}>
        <h1>홈</h1>
        {data?.map((_data, i) => (
          <NewsCard key={i} data={_data} />
        ))}
      </div>
    </div>
  );
};

export default Home;
