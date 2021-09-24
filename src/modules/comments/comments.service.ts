import { Op } from 'sequelize';
import db from '../../database/models';
import { Comment } from '../../types';
import { createError } from '../common/utils';

const { comments } = db;

export default class Comments {
  private id: string;

  private movieId: string;

  constructor(movieId: string = '', commentId?: string) {
    this.id = commentId;
    this.movieId = movieId;
  }

  public async createComment(params: Partial<Comment>) {
    const comment = await comments
      // @ts-ignore
      .create({
        ...params,
        movieId: this.movieId,
      })
      .catch((e) => {
        throw e;
      });

    if (comment) {
      return comment.get({ plain: true });
    }

    throw createError('Failed to create comment', 400);
  }

  public async findMovieComments(page: number = 1, size: number = 20, from: string, to: string) {
    const comment = await comments
      .findAndCountAll({
        where: {
          movieId: this.movieId,
          ...(from && {
            createdAt: {
              [Op.gt]: from,
            },
          }),
          ...(to && {
            createdAt: {
              [Op.lt]: to,
            },
          }),
        },
        limit: size,
        offset: (page - 1) * size,
        order: [['createdAt', 'DESC']],
      })
      .catch((e) => {
        throw e;
      });

    if (comment) {
      return comment;
    }

    throw createError('Failed to find comments', 400);
  }

  public async deleteComment() {
    const comment = comments.destroy({
      where: {
        id: this.id,
        ...(this.movieId && { movieId: this.movieId }),
      },
    });

    if (comment) {
      return true;
    }

    throw createError("Couldn't delete comment", 400);
  }
}
