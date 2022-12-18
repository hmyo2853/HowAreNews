export interface NewsAPI {
  articles: [
    {
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
  ];
}
