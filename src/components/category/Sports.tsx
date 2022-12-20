import { useQuery } from "react-query";
import { fetchNewsData } from "./Category.module";

export default function Sports() {
  const fetchSports = async () => {
    const URL =
      "https://newsapi.org/v2/top-headlines?country=kr&category=sports&apiKey=fdb223730c9a4641af46ee2787db1614";

    const _object = await fetchNewsData(URL);
    return _object;
  };

  const { data } = useQuery("newsData", fetchSports);
  console.log(data);
  return <>스포츠</>;
}
