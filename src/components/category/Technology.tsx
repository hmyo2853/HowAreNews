import { useQuery } from "react-query";
import { NewsAPI } from "../../howarenews";

export default function Technology() {
  const URL =
    "https://newsapi.org/v2/top-headlines?country=kr&category=technology&apiKey=fdb223730c9a4641af46ee2787db1614";

  const fetchNewsData = async (): Promise<NewsAPI | void> => {
    return fetch(URL).then(async (res) => {
      const json = await res.json();
      console.log(json);
    });
  };

  const { data } = useQuery("newsData", fetchNewsData);
  console.log(data);

  return <>테크놀로지</>;
}
