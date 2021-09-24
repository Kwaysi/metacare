import { minutesToHours } from 'date-fns';
import { NextFunction, Router, Request, Response } from 'express';
import { success, validate } from '../common/utils';
import Comments from './comments.service';
import { commentCreationRules } from './comments.validator';

const router = Router();

router.post(
  '/',
  commentCreationRules(),
  validate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        body: { comment, movieId },
      } = req;

      const newComment = await new Comments(movieId)
        .createComment({
          comment,
          ipAddress: req.ip,
        })
        .catch((e) => {
          throw e;
        });

      return res.status(200).json(success('Comment created successfully', newComment));
    } catch (e) {
      return next(e);
    }
  }
);

router.get(
  '/:movieId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        params: { movieId },
        query: { page, size, from = '', to = '' },
      } = req;

      const comments = await new Comments(movieId)
        .findMovieComments(Number(page), Number(size), String(from), String(to))
        .catch((e) => {
          throw e;
        });

      return res.status(200).json(
        success('Comment retrieved successfully', comments.rows, {
          page,
          size,
          count: comments.count,
        })
      );
    } catch (e) {
      return next(e);
    }
  }
);

router.delete('/:commentId', async (req, res, next) => {
  try {
    const {
      params: { commentId },
    } = req;

    const del = await new Comments('', commentId).deleteComment().catch((e) => {
      throw e;
    });

    if (del) {
      return res.status(200).json(success('Comment deleted successfully', null));
    }

    minutesToHours
  } catch (e) {
    return next(e);
  }
});

export default router;
