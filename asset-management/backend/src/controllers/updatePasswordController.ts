import {Request, Response} from 'express';
import {getPassword, updatePasswordQuery} from "../models/updatePasswordModel";
import {compareSync} from 'bcryptjs';

export const updatePassword = async (req:Request, res:Response):Promise<any> =>{
    const employeeId = req.params.employeeId;
    const {oldPassword, newPassword, retypedPassword} = req.body;
    try{
        const password = await getPassword(employeeId);
        if(password === -1){
            return res.status(404).json({
                "message": "User does not exist"
            })
        }
        const isPassword = compareSync(oldPassword, password);
        if (!isPassword) {
            return res.status(400).send({
                "message": "Incorrect old password"
            })
        }
        if(newPassword !== retypedPassword){
            return res.status(400).json({
                "message": "password mismatch"
            })
        }
        const result = await updatePasswordQuery(newPassword,employeeId);
        if(result === -1){
            return res.status(520).json({
                "message" : "password could not be updated"
            })
        }
        return res.status(200).json({
            "message" : "password updated successfully!"
        })
    }catch(err){
        console.log("error while updating password: "+err);
        return res.status(500).json({
            "message": "Internal server error"
        })
    }
}