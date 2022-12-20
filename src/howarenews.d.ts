export interface NewsAPI {
  source: {
    name: string;
  };
  author: null | string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}

export interface UserData {
  name: string | null;
  email: string | null;
}
