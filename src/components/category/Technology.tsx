import { useQuery } from "react-query";
import { fetchNewsData } from "./Category.module";

export default function Technology() {
  const fetchTechnology = async () => {
    const URL =
      "https://newsapi.org/v2/top-headlines?country=kr&category=technology&apiKey=fdb223730c9a4641af46ee2787db1614";

    const _object = await fetchNewsData(URL);
    return _object;
  };

  const { data } = useQuery("newsData", fetchTechnology);
  console.log(data);

  return <>테크놀로지</>;
}
