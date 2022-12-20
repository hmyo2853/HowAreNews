import { useQuery } from "react-query";
import { fetchNewsData } from "./Category.module";

export default function Entertainment() {
  const fetchEntertainment = async () => {
    const URL =
      "https://newsapi.org/v2/top-headlines?country=kr&category=entertainment&apiKey=fdb223730c9a4641af46ee2787db1614";

    const _object = await fetchNewsData(URL);
    return _object;
  };

  const { data } = useQuery("newsData", fetchEntertainment);
  console.log(data);
  return <>엔터</>;
}
