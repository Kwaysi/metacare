import { body } from 'express-validator';

export const commentCreationRules = () => [
  body('comment').isLength({
    min: 1,
    max: 500,
  }),
  body('movieId').isString(),
];
