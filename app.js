import express from "express";
import blogRoutes from "./routes/blog.js";
import path from "path";
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';
import passport, { setUserView } from './utils/library.js';
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { verifyUserToken } from "./utils/jwt.js";
import { redisC } from "./utils/redis.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(methodOverride('_method'));
app.set("view engine", 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('views', path.join(__dirname, 'views'));

//reading cookie
app.use(cookieParser());

//passport
app.use(passport.initialize());

//using redis
//app.use(redisC);

//make sure user is defined
app.use(verifyUserToken);
app.use(setUserView);

//routes
app.use("/", blogRoutes);
app.use('/auth', authRoutes);

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
});

