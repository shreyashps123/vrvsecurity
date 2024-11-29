import {Request, Response} from 'express';
import {getProfileQuery} from "../models/getProfileModel";

export const getProfile = async (req: Request, res:Response):Promise<void>=>{
    const employeeId = req.params.employeeId;
    try{
        const profile:object[] = await getProfileQuery(employeeId);
        if(profile.length == 0){
           res.status(404).json({
                "message": "profile not found"
            })
            return;
        }
        res.status(200).json({
            profile,
        })
    }catch(err){
        console.log("Error "+err);
        res.status(500).json({
            "message": "Internal server error"
        })
    }
}