import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import {
    addAssetQuery,
    approveRequestQuery,
    assignAssetQuery,
    checkAssetExists,
    deleteEmployeeQuery,
    deleteRequest,
    disapproveRequestQuery,
    disposeAssetQuery,
    getAllAssetsQuery,
    getAllEmployeesQuery,
    getEmployeeId,
    getRequestsQuery,
    unassignAssetQuery,
    updateAssetQuery,
    updateEmployeeQuery,
    getEmployeeByIdQuery,
    getAssetByIdQuery,
    registerEmployeeQuery, unassignDeletedEmployeesAssetsQuery, getAssetHistoryQuery


} from '../models/adminModel';
import {sendCredentials} from "./email";

export const getAllAssets = async (req: Request, res: Response): Promise<void> => {
    try {
        const assets = await getAllAssetsQuery();
        res.status(200).json(assets);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
}


export const registerEmployee = async (req: Request, res: Response) => {
    try {
        const {email, firstName, lastName, role, password, dateOfJoining, location, phoneNo} = req.body;
        console.log("in backend ")
        const isRegistered = await registerEmployeeQuery(email, firstName, lastName, role, password, dateOfJoining, location, phoneNo);
        if (!isRegistered) {
            res.status(409).json({"message": "Email already exists"});
            return;
        }
        await sendCredentials(email, password);
        console.log('successful registration');
        res.status(201).json({"message": "successful registration!"});
        return;

    } catch (err) {
        res.status(500).json({"message": "Internal server error"});
        console.log("error while creating user");
        console.log(err);
    }
}

export const addAssets = async (req: Request, res: Response): Promise<void> => {
    try {
        const {name, brand, description, type, location} = req.body;
        if (!name || !brand || !description || !type || !location) {
            res.status(400).json({error: 'Please provide all the fields'});
        }

        const addAsset = await addAssetQuery(name, brand, description, type, location);
        if (!addAsset) {
            res.status(409).json({
                "message": "asset already exists"
            })
            return;
        }
        res.status(201).json({
            "message": "Asset created successfully!"
        });
    } catch (err) {
        res.status(500).json({"message": "Internal server error"});
    }
}

export const disposeAsset = async (req: Request, res: Response): Promise<void> => {
    const assetName: string = req.params.assetName;
    try {
        const result = await disposeAssetQuery(assetName);
        if (result) {
            res.status(200).json({
                "message": "Asset disposed successfully!!"
            })
            return;
        } else {
            res.status(404).json({
                "message": "Asset does not exist"
            })
            return;
        }

    } catch (err) {
        console.log("error while disposing asset " + err)
        res.status(500).json({
            "message": "internal server error"
        })
    }

}

export const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
    const employeeEmail = req.body.employeeEmail;
    try {
        const employeeId = await getEmployeeId(employeeEmail);
        if (!employeeId) {
            res.status(404).json({
                "message": "Employee does not exist!"
            });
            return;
        }
        // const employeeAssets = await getAssetsForEmployee(employeeId);
        // await Promise.all(employeeAssets.map(async (asset) => {
        //     if (asset.id !== undefined) {
        //         await unassignAssetQuery(asset.id);
        //     }
        // }))
        await unassignDeletedEmployeesAssetsQuery(employeeId);

        const result = await deleteEmployeeQuery(employeeId);
        if (result) {
            res.status(200).json({
                "message": "Employee deleted successfully!!"
            })
        } else {
            res.status(404).json({
                "message": "Employee does not exist"
            })
        }
    } catch (err) {
        console.log("error while deleting employee " + err)
        res.status(500).json({
            "message": "internal server error"
        })
    }
}

export const unassignAsset = async (req: Request, res: Response): Promise<void> => {
    try {
        const asset_id = parseInt(req.params.asset_id);
        const employee_id = (req.body.employee_id);
        const last_updated = (req.body.last_updated);

        if (!asset_id) {
            res.status(400).json({"message": 'Please provide asset id'});
        }
        const unassignAsset = await unassignAssetQuery(asset_id,employee_id, last_updated);
        if (!unassignAsset) {
            res.status(404).json({"message": "asset does not exist"});
        }
        res.status(200).json({"message": "asset unassigned successfully!"});
    } catch (err) {
        res.status(500).json({"message": "Internal server error"});
    }
}

export const getAllEmployees = async (req: Request, res: Response): Promise<void> => {
    try {
        const employees = await getAllEmployeesQuery();
        res.status(200).json({
            employees,
        })
    } catch (err) {
        console.log("Internal server error " + err);
        res.status(500).json({"message": "Internal server error"});
    }
}

export const assignAsset = async (req: Request, res: Response): Promise<void> => {
    const {assetName, email} = req.body;
    try {
        const employeeId = await getEmployeeId(email);
        if (!employeeId) {
            res.status(404).json({"message": "Employee not found"});
            return;
        }
        const isAssigned = await assignAssetQuery(assetName, employeeId);
        if (!isAssigned) {
            res.status(520).json({"message": "Error while assigning asset"});
            return;
        }
        res.status(200).json({"message": "Asset assigned successfully"});
    } catch (err) {
        console.log("Internal server error " + err);
        res.status(500).json({"message": "Internal server error"});
    }
}

export const getRequests = async (req: Request, res: Response): Promise<void> => {
    try {
        const requests = await getRequestsQuery();
        res.status(200).json({
            requests
        })
    } catch (err) {
        console.log("Internal server error " + err);
        res.status(500).json({"message": "Internal server error"});
    }
}

export const approveRequest = async (req: Request, res: Response): Promise<void> => {
    const requestId = parseInt(req.params.requestId);
    const {assetName, employeeId} = req.body;
    try {
        const isAssigned = await assignAssetQuery(assetName, employeeId);
        if (!isAssigned) {
            const assetExists = await checkAssetExists(assetName);
            if (!assetExists) {
                res.status(404).json({"message": "Asset does not exist!!!"});
            } else {
                res.status(409).json({"message": "Asset is already assigned to another user!!!"});
            }
            return;
        }
        const isApproved = await approveRequestQuery(requestId);
        if (!isApproved) {
            res.status(404).json({"message": "request does not exist"})
        }
        res.status(200).json({"message": "request approved successfully"});
    } catch (err) {
        console.log("Internal server error " + err);
        res.status(500).json({"message": "Internal server error"});
    }
}

export const disapproveRequest = async (req: Request, res: Response): Promise<void> => {
    try {
        const requestId = parseInt(req.params.requestId);
        const isDisapproved = await disapproveRequestQuery(requestId);
        if (!isDisapproved) {
            res.status(404).json({"message": "Request does not exists"});
            return;
        }
        res.status(200).json({
            "message": "request disapproved successfully!"
        })
    } catch (err) {
        console.log("Internal server error " + err);
        res.status(500).json({"message": "Internal server error"});
    }
}

export const updateAsset = async (req: Request, res: Response): Promise<any> => {
    try {
        const {asset_id, employee_id, name, brand, description, type, location} = req.body;

        if (!asset_id) {
            return res.status(400).json({error: "There was an error while fetching id of asset"});
        }

        const result = await updateAssetQuery(asset_id, employee_id, name, brand, description, type, location);

        if (result.rowCount === 0) {
            return res.status(404).json({error: "Asset not found or no fields to update"});
        }

        return res.status(200).json({message: "Asset updated successfully"});
    } catch (error) {
        console.error("Error updating Asset:", error);
        return res.status(500).json({error: "Internal server error"});
    }
};

export const updateEmployee = async (req: Request, res: Response): Promise<any> => {
    try {
        const {employeeId, email, firstname, lastname, location, phone_number} = req.body;

        if (!employeeId) {
            return res.status(400).json({error: "id is required to update the employee details"});
        }

        const result = await updateEmployeeQuery(employeeId, email, firstname, lastname, location, phone_number);

        if (result.rowCount === 0) {
            return res.status(404).json({error: "Employee not found or no fields to update"});
        }

        return res.status(200).json({message: "Employee details updated successfully"});
    } catch (error) {
        console.error("Error updating employee details:", error);
        return res.status(500).json({error: "Internal server error"});
    }
};

export const getEmployeeById = async (req: Request, res: Response): Promise<void> => {
    try {
        const employeeId = parseInt(req.params.employeeId);

        const employee = await getEmployeeByIdQuery(employeeId);
        res.status(200).json(
            employee.rows
        );
    } catch (err) {
        console.log("Internal server error " + err);
        res.status(500).json({"message": "Internal server error"});
    }
}

export const getAssetById = async (req: Request, res: Response): Promise<void> => {
    try {
        const {assetId} = req.params;

        const asset = await getAssetByIdQuery(assetId);
        res.status(200).json(
            asset.rows
        );
    } catch (err) {
        console.log("Internal server error " + err);
        res.status(500).json({"message": "Internal server error"});
    }
}

export const getAssetHistory = async (req: Request, res: Response): Promise<void> => {
    try {
        const {assetId} = req.params;

        const asset = await getAssetHistoryQuery(assetId);
        res.status(200).json(
            asset.rows
        );
    } catch (err) {
        console.log("Internal server error " + err);
        res.status(500).json({"message": "Internal server error"});
    }
}

