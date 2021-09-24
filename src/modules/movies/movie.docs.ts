import { boolean, string } from '../../swaggerTypes';

export default {
  'v1/movies': {
    get: {
      tags: ['Movies'],
      summary: 'Get all movies',
      description: 'Gets movies sorted by release date along with the comment count',
      responses: {
        200: {
          description: 'Successful',
          schema: {
            type: 'object',
            properties: {
              status: boolean,
              message: string,
              data: {
                type: 'object',
                properties: {},
              },
            },
          },
        },
        400: {
          description: 'Failed',
          schema: {
            type: 'object',
            properties: {
              status: boolean,
              message: string,
              data: null,
            },
          },
        },
      },
    },
  },
};
