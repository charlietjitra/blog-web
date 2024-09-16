import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (user) => {
    const payload = {
        id: user.id,
        username : user.email,
        fname : user.fname,
        lname : user.lname,
    }
    return jwt.sign(payload,JWT_SECRET,{expiresIn: '15m'});
   
};

export const verifyUserToken = (req, res, next) => {
    const token = req.cookies?.token;
    console.log(token); // Debugging line
    
    if (token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded;
            console.log(decoded); 
            next();
        } catch (e) {
            console.error( e); 
            res.clearCookie('token');
            res.status(403).json('Invalid or expired token' );
        }
    } else {
        if (req.originalUrl.startsWith('/new') || req.originalUrl.startsWith('/edit') || req.originalUrl.startsWith('/delete')) {
            res.redirect('/auth/login');
        } else {
            next(); 
        }
    }
};


