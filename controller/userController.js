import passport from "passport";
import { findByEmail,findById,checkPass,create } from "../models/userModels.js";
import bcrypt from 'bcrypt';

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
            res.send("email has been registered");
        }
        
        const hashedPs = await bcrypt.hash(password,10);
        await create(fname, lname, username, hashedPs);
        res.redirect('/');
    }catch(err){
        res.send(err);
    }
};

export const login = (req,res,next) => {
    passport.authenticate('local',{
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: true
    })(req, res, next);
};

export const userLogout = (req,res,next) => {
    req.logout((err) => {
        if(err) { return next(err); }
        res.redirect('/');
    })
}