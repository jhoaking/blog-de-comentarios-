import  express from "express";
import { PORT } from "./config";
import cookieParser from "cookie-parser";
import { authRoutes } from "./routes/authRoutes";
import { blogUserRoutes } from "./routes/blogUserRoutes";


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/user',authRoutes);
app.use('/blog',blogUserRoutes)


app.listen(PORT, () =>{
    console.log(`server on port ${PORT}`);
})