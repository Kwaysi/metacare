import { boolean, string } from '../../swaggerTypes';

export default {
  'v1/comments': {
    post: {
      tags: ['Comments'],
      summary: 'Creates a comment for a movie',
      description: 'Creates a comment for a movie',
      parameters: [
        {
          name: 'body',
          in: 'body',
          type: 'object',
          required: true,
          schema: {
            properties: {
              movieId: string,
              comment: string,
            },
          },
        },
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
  'v1/comments/{movieId}': {
    get: {
      tags: ['Comments'],
      summary: 'Gets all comments by movieId',
      description: 'Gets all comments by movieId',
      parameters: [
        { in: 'query', name: 'to', type: 'string', required: false },
        { in: 'query', name: 'from', type: 'string', required: false },
        { in: 'query', name: 'page', type: 'string', required: false },
        { in: 'query', name: 'size', type: 'string', required: false },
        { in: 'path', name: 'movieId', type: 'string', required: false },
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
  'v1/comments/{commentId}': {
    delete: {
      tags: ['Comments'],
      summary: 'deletes a comment by Id',
      description: 'deletes a comment by Id',
      parameters: [{ in: 'path', name: 'commentId', type: 'string', required: false }],
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
