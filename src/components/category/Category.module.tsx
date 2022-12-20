import { NewsAPI } from "../../howarenews";

export const fetchNewsData = async (URL: string): Promise<NewsAPI | void> => {
  return fetch(URL).then(async (res) => {
    const json = await res.json();
    const _object = json.articles;
    return _object;
  });
};
