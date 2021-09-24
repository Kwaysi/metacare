import { Sequelize, DataTypes } from 'sequelize';

import Comments from './comments';
import dbconfig from '../config/config';

const { NODE_ENV = 'development' } = process.env;

const config = dbconfig[NODE_ENV];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const db = {
  sequelize,
  Sequelize,
  comments: Comments(sequelize, DataTypes),
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;
