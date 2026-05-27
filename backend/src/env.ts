import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
    PORT: process.env.PORT || 4000,
    DATABASE_URL: process.env.DATABASE_URL,
    API_URL: process.env.API_URL as string,
    CLIENT_URL: process.env.CLIENT_URL as string,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY as string
};