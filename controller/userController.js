import passport from "passport";
import { findByEmail,findById,checkPass,create } from "../models/userModels.js";
import bcrypt from 'bcrypt';
import { generateToken } from "../utils/jwt.js";

export const showRegisterForm = (req,res) => {
    res.render('pages/register');
}

export const showLoginForm = (req,res) => {
    res.render('pages/login');
}

export const register = async(req,res) => {
    const {fname, lname, username, password} = req.body;
    try{
        const existingUser = await findByEmail(username);
        if(existingUser){
            res.status(500).send("email has been registered");
        }
        
        const hashedPs = await bcrypt.hash(password,10);
        await create(fname, lname, username, hashedPs);
        res.redirect('/');
    }catch(err){
        res.send(err);
    }
};

export const login = (req,res,next) => {
    passport.authenticate('local',{ session : false },(err,user,info)=> {
        if(err) res.json('error');

        if(!user){
            return res.status(403).send("Invalid credentials");
        }

        const token = generateToken(user);
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });

        res.redirect('/');
        
    })(req, res, next);
};

export const userLogout = (req,res,next) => {
    console.log("loggingout user" + req.user);
    res.clearCookie('token');
    res.redirect('/');
    
}