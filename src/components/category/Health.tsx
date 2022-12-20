import { useQuery } from "react-query";
import Card from "../card/Card";
import Loading from "../Loading";
import { fetchNewsData } from "./Category.module";

export default function Health() {
  const fetchHealth = async () => {
    const URL =
      "https://newsapi.org/v2/top-headlines?country=kr&category=health&apiKey=fdb223730c9a4641af46ee2787db1614";

    return await fetchNewsData(URL);
  };

  const { data, isLoading } = useQuery("Health", fetchHealth);

  if (isLoading) return <Loading />;
  return (
    <>
      <h1>건강</h1>
      {data?.map((_data, i) => (
        <Card key={i} data={_data} />
      ))}
    </>
  );
}
