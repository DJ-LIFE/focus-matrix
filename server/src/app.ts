import express from "express"
import dotenv from "dotenv";
import cors from "cors";

dotenv.config()
connectToDb()

const app = express();
app.use(cors())
app.use(express.json())