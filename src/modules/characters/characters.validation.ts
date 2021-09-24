import { body, query } from 'express-validator';

export const getCharactersRules = () => [
  query('sort').isIn(['name', 'height']),
  query('sortOrder').isIn(['ASC', 'DESC']),
  query('filter').isIn(['male', 'female', 'n/a']),
];
