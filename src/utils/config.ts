import * as dotenv from 'dotenv';

dotenv.config();

export const PORT = +(process.env.PORT as string);
export const BOT_TOKEN = process.env.BOT_TOKEN;
