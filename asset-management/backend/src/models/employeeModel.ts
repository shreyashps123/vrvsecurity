import pool from '../db/pool';
import {QueryResult} from "pg";
import {Asset} from "../types/assetTypes";
import {EmployeeRequest} from "../types/requestType";


export const getAssetsForEmployee = async (employeeId: number): Promise<Asset[]>=> {
    const query = `SELECT *
                   FROM assets
                   WHERE employee_id = $1`;
    const values = [employeeId];
    try {
        const result = await pool.query<Asset>(query, values);
        return result.rows;
    } catch (err) {
        console.log('error getting assets: ' + err);
        throw err;
    }

}

export const getAssetId = async (assetName: string) : Promise<number|null>=> {
    const query = `SELECT id
                   from assets
                   WHERE name = $1`;
    const values = [assetName];
    try {
        const result = await pool.query<{id:number}>(query, values);
        return result.rows.length > 0 ? result.rows[0].id : null;
    } catch (err) {
        console.log('error getting assets_id ' + err);
        throw err;
    }
}

export const requestAssetQuery = async (values: number[]):Promise<number|null> => {
    const query = `INSERT INTO request_asset(employee_id, asset_id, created_at)
                   VALUES ($1, $2, NOW())
                   ON CONFLICT (employee_id, asset_id) DO NOTHING`;
    try {
        const result: QueryResult = await pool.query(query, values);
        return result.rowCount;
    } catch (err) {
        console.log('error getting assets_id ' + err);
        throw err;
    }
}

export const editProfile = async (
    email: string,
    firstname?: string,
    lastname?: string,
    location?: string,
    phone_number?: string
): Promise<any> => {
    let query = `UPDATE employees
                 SET `;
    const updates: string[] = [];
    const values: any[] = [];

    if (firstname) {
        updates.push(`firstname = $${values.length + 1}`);
        values.push(firstname);
    }
    if (lastname) {
        updates.push(`lastname = $${values.length + 1}`);
        values.push(lastname);
    }
    if (location) {
        updates.push(`location = $${values.length + 1}`);
        values.push(location);
    }
    if (phone_number) {
        updates.push(`phone_number = $${values.length + 1}`);
        values.push(phone_number);
    }

    query += updates.join(", ");
    query += ` WHERE email = $${values.length + 1}`;
    values.push(email);

    return pool.query(query, values);
};

export const getAvailableAssetsQuery = async ():Promise<Asset[]> => {
    const query = `SELECT id, name, brand, type
                   FROM assets
                   WHERE status = 'unassigned'`;
    try {
        const result = await pool.query<Asset>(query);
        return result.rows;
    } catch (err) {
        console.log('error getting available assets ' + err);
        throw err;
    }
}

export const getMyRequestsQuery = async (employeeId: number):Promise<EmployeeRequest[]> => {
    const query = `SELECT r.id, a.name, r.status, r.created_at as createdAt
                   FROM request_asset r
                            INNER JOIN assets a on a.id = r.asset_id WHERE r.employee_id = $1`;
    try{
        const result = await pool.query<EmployeeRequest>(query,[employeeId]);
        return result.rows;
    }catch(err){
        throw err;
    }
}



export const getEmployeeAssetHistoryQuery = async (employeeId: string) => {

    const query = `SELECT *
                   from employee_assets_history
                   WHERE employee_id = $1 ORDER BY from_date DESC `;
    const values = [employeeId];
    try {
        const result = await pool.query(query, values);
        return result;

    } catch (err) {
        console.log('error getting assetId ' + err);
        throw err;
    }

}