import { config } from 'dotenv';

config();

export const AWS_ARN = process.env.AWS_ARN;
export const MONGODB_URL = process.env.MONGODB_URI;
export const MONGO_DEBUG = true;
