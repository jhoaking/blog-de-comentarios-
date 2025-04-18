import  express,{Request,Response} from "express";
import { PORT } from "./config";

const app = express();
app.use(express.json());




app.listen(PORT, () =>{
    console.log(`server on port ${PORT}`);
})