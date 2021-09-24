import { body, query } from 'express-validator';

export const getCharactersRules = () => [
  query('sort').isIn(['name', 'height']).optional(true),
  query('sortOrder').isIn(['ASC', 'DESC']).optional(true),
  query('filter').isIn(['male', 'female', 'n/a']).optional(true),
];
