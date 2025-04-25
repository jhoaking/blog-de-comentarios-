import  express from "express";
import { PORT } from "./config";
import cookieParser from "cookie-parser";
import { authRoutes } from "./routes/authRoutes";
import { blogUserRoutes } from "./routes/blogUserRoutes";
import { comentarioRoute } from "./routes/comentariosRoutes";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/user',authRoutes);
app.use('/blog',blogUserRoutes)
app.use('/blogs',comentarioRoute)


app.listen(PORT, () =>{
    console.log(`server on port ${PORT}`);
})