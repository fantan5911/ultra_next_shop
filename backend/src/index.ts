import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ENV } from './env';
import dotenv from 'dotenv';
import { PrismaClient } from './generated/prisma/client';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import router from './routes/route';
import errorMiddleware from './middlewares/error.middleware';

const {Pool} = pg;

const pool: any = new Pool({connectionString: ENV.DATABASE_URL});
const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({adapter});

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/api', router);
app.use(errorMiddleware);


const start = () => {
    try {
        app.listen(ENV.PORT, () => console.log(`🚀 Server running on [32mhttp://localhost:${ENV.PORT}[0m`));
    }
    catch (e) {
        console.log(e)
    }
}

start()
