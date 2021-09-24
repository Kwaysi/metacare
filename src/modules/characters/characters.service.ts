import axios from 'axios';
import Cache from 'memory-cache';

export default class Characters {
  constructor() {}

  private conn = axios.create({
    baseURL: process.env.DATA_SOURCE,
  });

  public async getCharacterList() {
    let characters: any[] = Cache.get('characters');

    if (!characters) {
      console.log('Get data from endpoint');
      const gc = [];

      for (let i = 1; i < 10; i++) {
        gc.push(
          this.conn
            .get(`/people?page=${i}`)
            .then((r) => r.data.results)
            .catch((e) => {
              console.log(e);
              throw e;
            })
        );
      }

      characters = await Promise.all(gc)
        .then((e) => {
          let data = [];

          e.forEach((r) => {
            data = [...data, ...r];
          });
          return data;
        })
        .catch((e) => {
          throw e;
        });

      Cache.put('characters', characters);
    } else {
      console.log('Loaded from cache');
    }

    return characters;
  }
}
