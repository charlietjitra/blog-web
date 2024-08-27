import express from "express";
import blogRoutes from "./routes/blog.js";
import path from "path";
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';
import session from 'express-session';
import passport, { flashMessage, setUserView } from './utils/library.js';
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv";
import flash from "connect-flash"

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(methodOverride('_method'));
app.set("view engine", 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('views', path.join(__dirname, 'views'));

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized:false,
        cookie: {maxAge: 24 * 60 * 60 * 1000}
    })
);

//flash message available
app.use(flash());
app.use(flashMessage)

app.use(passport.initialize());
app.use(passport.session());

//make sure user is defined
app.use(setUserView);

//routes
app.use("/", blogRoutes);
app.use('/auth', authRoutes);

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
});

