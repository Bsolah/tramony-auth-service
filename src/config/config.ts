import appConfig from '../config';

const config = {
  development: {
    username: appConfig().dbUser,
    password: appConfig().dbPassword,
    database: appConfig().dbName,
    host: appConfig().dbHost,
    dialect: 'postgres',
    ssl: true,
    dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
            native: true
        },
  },
  test: {
    username: appConfig().dbUser,
    password: appConfig().dbPassword,
    database: appConfig().dbName,
    host: appConfig().dbHost,
    dialect: 'postgres',
    // ssl: true,
    // dialectOptions: {
    //         ssl: {
    //             require: true,
    //             rejectUnauthorized: false,
    //         },
    //         native: true
    //     },
  },
  production: {
    username: appConfig().dbUser,
    password: appConfig().dbPassword,
    database: appConfig().dbName,
    host: appConfig().dbHost,
    dialect: 'postgres',
    // ssl: true,
    // dialectOptions: {
    //         ssl: {
    //             require: true,
    //             rejectUnauthorized: false,
    //         },
    //         native: true
    //     },
  },
};

export default config;
module.exports = config;
