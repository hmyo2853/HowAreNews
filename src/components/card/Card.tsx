import { PropsWithChildren } from "react";
import { NewsAPI } from "../../howarenews";

interface GetDataProps {
  data: NewsAPI;
}

const Card = ({ data }: PropsWithChildren<GetDataProps>) => {
  return (
    <>
      <div>제목 : {data.title}</div>
      <div>기자 : {data.author}</div>
      <div>설명 : {data.description}</div>
      <div>발행시간 : {data.publishedAt}</div>
      <div>발행처 : {data.source.name}</div>
      <div>링크 : {data.url}</div>
      <img alt={data.title} src={data.urlToImage} width="120px" />
    </>
  );
};

export default Card;
