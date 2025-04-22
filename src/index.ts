import  express from "express";
import { PORT } from "./config";
import { authRouter } from "./routes/AuthRoutes";



const app = express();
app.use(express.json());

app.use('/user',authRouter)


app.listen(PORT, () =>{
    console.log(`server on port ${PORT}`);
})