import express from "express";
import ejs from "ejs";
import blogRoutes from "./routes/blog.js";
import path from "path";
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';
import axios from "axios";
import dotenv from "dotenv";


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.set("view engine", 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('views', path.join(__dirname, 'views'));

app.use(methodOverride('_method'));

//routes
app.use("/", blogRoutes);

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
});

