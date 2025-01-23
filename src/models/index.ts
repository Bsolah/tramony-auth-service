import sequelize from 'sequelize';
import config from '../config';

const { Sequelize } = sequelize;

const sequelizeInstance = new Sequelize({
  dialect: 'postgres',
  host: config().dbHost,
  password: config().dbPassword,
  username: config().dbUser,
  database: config().dbName,
  logging: false,
  // dialectOptions: {
  //   ssl: {
  //     require: true,
  //     rejectUnauthorized: false,
  //   },
  //   native: true,
  // },
});

export default sequelizeInstance;