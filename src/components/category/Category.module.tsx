import { NewsAPI } from "../../howarenews";

export const fetchNewsData = async (URL: string): Promise<NewsAPI[] | void> => {
  const _req = new Request(URL);

  return fetch(_req).then(async (_res) => {
    const json = await _res.json();
    const _object = json.news;
    const _uniqueJson = Array.from(
      _object.reduce((m: any, t: any) => m.set(t.title, t), new Map()).values()
    ) as NewsAPI[];
    return _uniqueJson;
  });
};
