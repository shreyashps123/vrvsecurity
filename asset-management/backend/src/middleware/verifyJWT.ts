import dotenv from "dotenv";
dotenv.config();
import {Request,Response,NextFunction} from "express";
import {verifyUser} from "../models/auth";

const jwt = require('jsonwebtoken');

interface User {
    role: string;
}

interface AuthenticatedRequest extends Request {
    user?: User;
}


export const authenticateToken = (req:AuthenticatedRequest, res:Response, next:NextFunction):void => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    console.log('Authorization Header:', authHeader);
    console.log('Extracted Token:', token);

    if (!token) {
        res.status(403).json({ "message": 'Access denied. No token provided.' });
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET, async(err:any, user:any):Promise<void> => {
        if (err) {
            console.error('Token verification error:', err);
            res.status(401).json({ "message": 'Invalid token.' });
            return;
        }
        const result = await verifyUser(user);
        if(!result){
            res.status(404).json({
                "message": "User does not exists"
            })
            return;
        }
        req.user = user;
        next();
    });
};


