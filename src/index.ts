import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import { config } from 'dotenv';
import swaggerUI from 'swagger-ui-express';

import doc from './swagger';
import db from './database/models';
import movies from './modules/movies/movie.routes';
import { errorHandler } from './modules/common/utils';
import comments from './modules/comments/comments.routes';
import characters from './modules/characters/characters.routes';

config();

const app = express();
const { PORT, NODE_ENV } = process.env;

app.use(helmet());
app.set('trust proxy', true);
app.use(
  cors({
    origin: (_origin, callback) => {
      callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));
app.disable('x-powered-by');

// Routes
app.use('/v1/movies', movies);
app.use('/v1/comments', comments);
app.use('/v1/characters', characters);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(doc));
app.use('/', async (_req, res) => {
  return res.send(`
  <h1>Welcome to Star wars API </h1>
  <p>Hit an endpoint to get started of visit <a href='/docs'>/docs</a> to get started</p>
  `);
});

app.use(errorHandler);

// Start the server
db.sequelize
  .sync()
  .then(() => {
    if (NODE_ENV !== 'test') {
      console.log(`Environment is ${NODE_ENV}`);
      console.log(`Connected to database: ${process.env.DB_NAME}`);
      app.listen(PORT, () => {
        console.log(`Server started on port: ${PORT}`);
      });
    }
  })
  .catch((err) => console.log(err));
