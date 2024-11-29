import {Request, Response} from 'express';
import {
    getAssetId,
    getAssetsForEmployee,
    getAvailableAssetsQuery,
    requestAssetQuery,
    editProfile,
    getMyRequestsQuery,
    getEmployeeAssetHistoryQuery
} from "../models/employeeModel";
import {getAssetHistoryQuery} from "../models/adminModel";

export const getAssetsByEmployeeId = async (req: Request, res: Response): Promise<void> => {
    const employeeId =parseInt(req.params.employeeId);
    try {
        const assets = await getAssetsForEmployee(employeeId);
        res.status(200).json({
            "assets": assets
        })
        return;
    } catch (err) {
        console.log('error fetching assets! ' + err);
        res.status(500).json({
            "message": "Internal server error"
        })
    }
}

export const getAvailableAssets = async (req: Request, res: Response): Promise<void> => {
    try {
        const assets = await getAvailableAssetsQuery();
        res.status(200).json({
            "assets": assets
        });

    } catch (err) {
        console.log('error fetching assets! ' + err);
        res.status(500).json({
            "message": "Internal server error"
        })
    }
}

export const requestAsset = async (req: Request, res: Response): Promise<void> => {
    const {assetName, employeeId} = req.body;
    try {
        const assetId = await getAssetId(assetName);
        if (!assetId) {
            res.status(404).json({
                "message": "asset does not exist!"
            });
            return;
        }
        const values:number[] = [employeeId, assetId];
        const result = await requestAssetQuery(values);
        if (!result) {
            res.status(409).json({
                "message": "request already exists"
            })
            return;
        }
        res.status(201).json({
            "message": "request created successfully"
        })

    } catch (err) {
        console.log("error while requesting asset: " + err);
        res.status(500).json({
            "message": "Internal server error"
        })
    }
}


export const updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const {email, firstname, lastname, location, phone_number} = req.body;

        if (!email) {
             res.status(400).json({error: "Email is required to update the profile"});
        }

        const result = await editProfile(email, firstname, lastname, location, phone_number);

        if (!result.rowCount) {
             res.status(404).json({error: "Employee not found or no fields to update"});
        }

         res.status(200).json({message: "Profile updated successfully"});
    } catch (error) {
        console.error("Error updating profile:", error);
         res.status(500).json({error: "Internal server error"});
    }
};

export const getMyRequests = async (req: Request, res: Response): Promise<void> => {
    const employeeId = parseInt(req.params.employeeId);
    try {
        const requests = await getMyRequestsQuery(employeeId);
        if (!requests) {
            res.status(404).json({
                "message": "employee not found!!"
            })
            return;
        }
        res.status(200).json({
            requests
        })
    } catch (err) {
        console.error("Error while fetching your requests:", err);
        res.status(500).json({message: "Internal server error"});
    }
}


export const getEmployeeAssetHistory = async (req: Request, res: Response): Promise<void> => {
    try {
        const {employeeId} = req.params;

        const asset = await getEmployeeAssetHistoryQuery(employeeId)
        res.status(200).json(
            asset.rows
        );
    } catch (err) {
        console.log("Internal server error " + err);
        res.status(500).json({"message": "Internal server error"});
    }
}