import express from 'express';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.get("/",async (req: Request, res: Response): Promise<void> => {
    res.status(200).send("Hello, World!");

})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})