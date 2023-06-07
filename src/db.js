import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

export default async function getDatabaseSchema() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    const [rows] = await connection.execute('SHOW TABLES');
    const tables = rows.map((row) => Object.values(row)[0]);

    const schema = {};

    for (const table of tables) {
        const [columns] = await connection.execute(`SHOW COLUMNS FROM ${table}`);
        const fields = columns.map((column) => ({
            name: column.Field,
            type: column.Type,
        }));

        schema[table] = fields;
    }

    connection.end();

    return schema;
}
