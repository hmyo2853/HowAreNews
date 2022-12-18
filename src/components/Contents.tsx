import { useEffect } from "react";
import { useQuery } from "react-query";
import { NewsAPI } from "../howarenews";

const Contents = () => {
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

  return <>여기는 뉴스 리스트가 나올 부분입니다.</>;
};

export default Contents;
