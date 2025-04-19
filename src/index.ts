import  express from "express";

import { PORT } from "./config";
import routerAuth from './routes/AuthRoutes'

const app = express();
app.use(express.json());

app.use('/user',routerAuth)


app.listen(PORT, () =>{
    console.log(`server on port ${PORT}`);
})