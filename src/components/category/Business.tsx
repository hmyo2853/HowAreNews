import { useQuery } from "react-query";
import Card from "../card/Card";
import Loading from "../Loading";
import { fetchNewsData } from "./Category.module";

export default function Business() {
  const fetchBusiness = async () => {
    const URL =
      "https://newsapi.org/v2/top-headlines?country=kr&category=business&apiKey=fdb223730c9a4641af46ee2787db1614";

    return await fetchNewsData(URL);
  };

  const { data, isLoading } = useQuery("Business", fetchBusiness);

  if (isLoading) return <Loading />;
  return (
    <>
      <h1>비즈니스</h1>
      {data?.map((_data, i) => (
        <Card key={i} data={_data} />
      ))}
    </>
  );
}
