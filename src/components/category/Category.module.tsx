import { NewsAPI } from "../../howarenews";

export const fetchNewsData = async (URL: string): Promise<NewsAPI[] | void> => {
  const _req = new Request(URL);

  return fetch(_req).then(async (_res) => {
    const json = await _res.json();
    const _object = json.articles;
    return _object;
  });
};
