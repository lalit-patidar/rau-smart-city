import express from 'express';
 import helmet from 'helmet';
 import cors from 'cors';
import './config/db/setup';
import expressGlobalErrorHandling from "./utils/errorHandling/express-global-err-handling";


const app = express()

app.use(express.json());
app.use(helmet())
app.use(cors());
app.use(expressGlobalErrorHandling)
 
export default app;

