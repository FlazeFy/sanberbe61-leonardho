import dotenv from 'dotenv';
dotenv.config();

export const SECRET: string = process.env.SECRET || "secret";
export const DATABASE_URL: string = process.env.DATABASE_URL || "s";