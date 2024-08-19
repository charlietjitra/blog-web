import pg from "pg"
import dotenv from 'dotenv';

const { Pool } = pg;

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

/*
// Test the connection
const testConnection = async () => {
    try {
        const client = await pool.connect();
        console.log('Database connected successfully');
        client.release(); // Release the client back to the pool
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

// Call the test function
testConnection();*/

export default pool;