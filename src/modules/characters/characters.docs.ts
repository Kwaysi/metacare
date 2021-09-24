import { boolean, string } from '../../swaggerTypes';

export default {
  'v1/characters': {
    get: {
      tags: ['Character'],
      summary: 'Get all characters',
      // description: 'Creates a comment for a movie',
      parameters: [
        { in: 'query', name: 'sort', type: 'string', required: false, example:'name, height' },
        { in: 'query', name: 'sortOrder', type: 'string', required: false, example:'ASC, DESC' },
        { in: 'query', name: 'filter', type: 'string', required: false, example:'male, female, n/a' },
      ],
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
