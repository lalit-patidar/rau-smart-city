import express from 'express';
 import helmet from 'helmet';
 import cors from 'cors';
import './config/db/setup';
import expressGlobalErrorHandling from "./utils/errorHandling/express-global-err-handling";
import userRouter from './modules/users';


const app = express()

app.use(express.json());
app.use(helmet())
app.use(cors());
app.use(userRouter);
app.use(expressGlobalErrorHandling);

app.get('/hello', (req, res) => res.send("hello world123"))
 
export default app;

