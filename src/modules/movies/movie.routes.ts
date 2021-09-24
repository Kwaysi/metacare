import { Router } from 'express';
import Comments from '../comments/comments.service';
import { success } from '../common/utils';
import Movie from './movie.service';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const movies = await Movie.getMovieList();

    const getComments = [];

    for (let movie of movies) {
      getComments.push(
        new Comments(movie.episodeId)
          .getMovieCommentsCount()
          .then((commentCount) => ({
            ...movie,
            commentCount,
          }))
          .catch((e) => {
            console.log(e);
            throw e;
          })
      );
    }

    const moviesWithCommentCount = await Promise.all(getComments);

    return res.status(200).json(
      success('Movies retrieved successful', moviesWithCommentCount, {
        total: movies.length,
      })
    );
  } catch (e) {
    return next(e);
  }
});

export default router;
