import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();


const client = createClient({
    url: process.env.REDIS_URL,
});

client.on("error", (err) => {
    console.error("❌ Redis Client Error", err);
});
client.on('connect', () => console.log('✅ Redis connected'));

export const connectRedis = async () => {
    await client.connect()
}
export default client;