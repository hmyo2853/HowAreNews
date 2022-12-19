import { useQuery } from "react-query";
import { NewsAPI } from "../howarenews";

const Home = () => {
  const URL =
    "https://newsapi.org/v2/top-headlines?country=kr&apiKey=fdb223730c9a4641af46ee2787db1614";

  const fetchNewsData = async (): Promise<NewsAPI | void> => {
    return fetch(URL).then(async (res) => {
      const json = await res.json();
      console.log(json);
    });
  };

  const { data } = useQuery("newsData", fetchNewsData);
  console.log(data);

  return <>메인 홈</>;
};

export default Home;
