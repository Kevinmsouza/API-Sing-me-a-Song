import pg from 'pg';

const { Pool } = pg;

const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_DATABASE,
} = process.env;

const databaseConfig = {
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_DATABASE,
};

const connection = new Pool(databaseConfig);

export default connection;
