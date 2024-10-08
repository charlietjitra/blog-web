import passport from "passport";
import {Strategy as localStrategy} from "passport-local";
import { findByEmail, findById, checkPass } from "../models/userModels.js";

export const setUserView = (req, res, next) => {
    res.locals.user = req.user || null;
    next();
} 

passport.use(
    new localStrategy(async (username, password,cb)=>{
        try{
            const user = await findByEmail(username);
            if(!user) return cb(null, false, {message: "user not found "})
            
            const match = await checkPass(password, user.password);
            if(!match) return cb(null, false, {message: "incorrect password"});
            
            return cb(null,user);
        }catch(err){
            return cb(err);
        }

}));

passport.serializeUser((user,cb)=>{
    cb(null,user.id);
})

passport.deserializeUser(async (id,cb)=>{
    const user = await findById(id);
   cb(null, user);
})

export default passport;