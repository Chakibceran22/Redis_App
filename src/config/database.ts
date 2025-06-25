import { Pool } from "pg";
import dotenv from "dotenv";


dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,  
})

export const query = async (text: string, params?: any[]) => {
    return pool.query(text, params);
}

export const initDB = async () => {
    try {
         await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Database initialized');
    }catch (error: any){
        console.error('❌ Database initialization failed:', error);
        throw error;
    }
}