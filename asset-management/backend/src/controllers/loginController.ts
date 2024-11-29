import dotenv from "dotenv";
dotenv.config();

import {Request, Response, NextFunction} from "express";
import loginModel from '../models/loginModel'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const authLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {username, password}: { username: string; password: string } = req.body;
    try{
        const user = await loginModel.findUser(username);
        console.log(user);
        if(!user) return void res.status(400).json({error: 'User not found'});
        console.log("above password", password, user.password);

        //const hashedPassword = await bcryptjs.hash(password, 10);
        const validPassword= await bcryptjs.compare(password, user.password);
        // const validPassword=1;
        console.log("bellowpassword", validPassword);
        if(!validPassword){
            return void res.status(400).json({error: 'Invalid password'});
        }

        console.log('JWT_SECRET:', process.env.JWT_SECRET);

        console.log("before token");
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
        console.log('Generated Token:', token);
        return void res.json({token,role:user.role, user_id: user.id, email: user.email});
        // return res.status(200).json({ message: 'Login successful', token });
    } catch (err){
        console.log(err);
        res.status(500).json(err);
    }
};

export default authLogin;