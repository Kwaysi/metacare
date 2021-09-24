import axios from 'axios';
import Cache from 'memory-cache';

export default class Movie {
  constructor() {}

  private static conn = axios.create({
    baseURL: process.env.DATA_SOURCE,
  });

  public static async getMovieList() {
    let movies = Cache.get('movies');

    if (!movies) {
      movies = await this.conn
        .get(`/films`)
        .then((r) => r.data.results)
        .catch((e) => {
          console.log(e);
          throw e;
        });

      movies = movies.map((e) => ({
        title: e.title,
        episodeId: e.episode_id,
        openingCrawl: e.opening_crawl,
        releaseDate: new Date(e.release_date),
      }));

      // @ts-ignore
      movies.sort((a, b) => a.releaseDate - b.releaseDate);

      Cache.put('movies', movies);
    }

    return movies;
  }
}
