// const pool = require("../db/pool");

import pool from '../db/pool';
import {QueryResult} from "pg";
import {Employee} from '../types/employeeTypes';
import {Asset} from "../types/assetTypes";
import {PendingAssetsRequest} from "../types/requestType";
import bcrypt from "bcryptjs";


export const getAllAssetsQuery = async ():Promise<Asset[]> => {
    const result =  await pool.query<Asset>(`SELECT a.id,
                                    e.firstname || ' ' || e.lastname as assigned_to,
                                    a.employee_id,
                                    a.name,
                                    a.brand,
                                    a.type,
                                    a.location,
                                    a.status,
                                    a.created_at,
                                    a.last_updated
                             FROM assets a
                                      LEFT JOIN employees e on a.employee_id = e.id WHERE a.status in ($1,$2)`,['assigned','unassigned']);
    return result.rows
}

export const addAssetQuery = async (name: string, brand: string, description: string, type: string, location: string):Promise<number|null> => {
    const query = `INSERT INTO assets (name, brand, description, type, location, status, created_at,
                                       last_updated)
                   VALUES ($1, $2, $3, $4, $5, $6, current_date, current_date)
                   ON CONFLICT (name) DO NOTHING`;
    const result: QueryResult = await pool.query(query, [name, brand, description, type, location, 'unassigned']);
    return result.rowCount;
}

export const disposeAssetQuery = async (assetName: string):Promise<number|null> => {
    const query = `UPDATE assets SET status = 'disposed'
                   WHERE name = $1`;
    const values = [assetName];
    try {
        const result = await pool.query(query, values);
        return result.rowCount;
    } catch (err) {
        console.log('error while deleting asset' + err);
        throw err;
    }
}
export const registerEmployeeQuery = async(email:string, firstName:string, lastName:string, role:string, password:string, dateOfJoining:string, location:string, phoneNo:string):Promise<number|null>=>{
    const salt = 10;
    const hashedPassword = bcrypt.hashSync(password, salt);
    const query = `INSERT INTO employees(email, firstname, lastname, role, password, date_of_joining, location,
                                             phone_number)
                       VALUES ($1, $2,$3,$4,$5,$6,$7,$8) ON CONFLICT DO NOTHING `;
    try {
        const result = await pool.query(query, [email, firstName, lastName, role, hashedPassword, dateOfJoining, location, phoneNo]);
        return result.rowCount;
    }catch(err){
        console.log('error while adding employee ' + err);
        throw err;
    }
}
export const getEmployeeId = async (employeeEmail: string): Promise<number|null> => {
    const query = `SELECT id
                   from employees
                   WHERE email = $1 and status=$2`;
    const values = [employeeEmail,'active'];
    try {
        const result = await pool.query<{id:number}>(query, values);
        return result.rows.length > 0 ? result.rows[0].id : null;

    } catch (err) {
        console.log('error getting assets_id ' + err);
        throw err;
    }
}

export const deleteEmployeeQuery = async (employeeId: number): Promise<number | null> => {
    const query = `UPDATE
                   employees SET status = 'inactive'
                   WHERE id = $1`;
    const values = [employeeId];
    try {
        const result: QueryResult = await pool.query(query, values);
        return result.rowCount;
    } catch (err) {
        console.log('error while deleting employee' + err);
        throw err;
    }
}

export const unassignDeletedEmployeesAssetsQuery = async(employeeId:number):Promise<number|null>=>{
    const query = `UPDATE assets
                   SET employee_id=$1,
                       status=$2,
                       last_updated=CURRENT_DATE
                   WHERE employee_id = $3`
    const values = [null, "unassigned", employeeId];
    const result: QueryResult = await pool.query(query, values);
    return result.rowCount;
}

export const unassignAssetQuery = async (asset_id: number, employee_id: string, last_updated: string):Promise<number|null> => {
    // let emp_id=parseInt(employee_id);

    const query = `UPDATE assets
                   SET employee_id=$1,
                       status=$2,
                       last_updated=CURRENT_DATE
                   WHERE id = $3`
    const values = [null, "unassigned", asset_id];
    const result: QueryResult = await pool.query(query, values);
    console.log("Asset unassigned:", result.rowCount);
    await pool.query(`INSERT INTO employee_assets_history (asset_id, employee_id, from_date, to_date) VALUES ($1,$2,$3,now())`, [asset_id, employee_id, last_updated]);
    return result.rowCount;
}




export const getAllEmployeesQuery = async ():Promise<Employee[]> => {
    const query = `SELECT id as employee_id,
                          firstname || ' ' || lastname as employee_name,
                          email,
                          date_of_joining,
                          location,
                          phone_number
                   FROM employees WHERE status='active'`
    const result = await pool.query<Employee>(query);
    return result.rows;
}

export const assignAssetQuery = async (assetName: string, employeeId: number): Promise<number | null> => {
    const query = `UPDATE assets
                   SET employee_id=$1,
                       status=$2,
                       last_updated=current_date
                   WHERE name = $3 and status='unassigned'`;
    const result: QueryResult = await pool.query(query, [employeeId, "assigned", assetName]);
    return result.rowCount;
}

export const getRequestsQuery = async ():Promise<PendingAssetsRequest[]> => {
    const query = `SELECT r.id,
                          r.employee_id as employeeId,
                          e.firstname || ' ' || e.lastname as employeeName,
                          e.email as employeeEmail,
                          a.name                           as assetName,
                          r.created_at as createdAt
                   FROM request_asset r
                            INNER JOIN
                        employees e ON r.employee_id = e.id
                            INNER JOIN
                        assets a ON r.asset_id = a.id WHERE r.status = 'pending' AND e.status = 'active'
                   ORDER BY r.created_at DESC;`;
    const result = await pool.query<PendingAssetsRequest>(query);
    return result.rows;
}

export const deleteRequest = async(requestId:string):Promise<number|null>=>{
    const query = `DELETE FROM request_asset WHERE id=$1`;
    const result = await pool.query(query,[requestId]);
    return result.rowCount;
}
export const disapproveRequestQuery = async(requestId:number):Promise<number|null>=>{
    const query = `UPDATE request_asset SET status = 'disapproved' WHERE id=$1`;
    const result = await pool.query(query,[requestId]);
    return result.rowCount;
}

export const approveRequestQuery = async(requestId:number):Promise<number|null>=>{
    const query = `UPDATE request_asset SET status = 'approved' WHERE id=$1`;
    const result = await pool.query(query,[requestId]);
    return result.rowCount;
}
export const checkAssetExists = async(assetName:string):Promise<number|null>=>{
    const query = `SELECT id FROM assets WHERE name=$1 AND status IN ('assigned','unassigned')`;
    const result:QueryResult = await pool.query(query,[assetName]);
    return result.rowCount;
}

export const updateAssetQuery = async  (
    id: string,
    employee_id?: string,
    name?: string,
    brand?: string,
    description?: string,
    type?: string,
    location?: string
): Promise<any> => {
    let query = `UPDATE assets SET `;
    const updates: string[] = [];
    const values: any[] = [];

    if (employee_id) {
        updates.push(`employee_id = $${values.length + 1}`);
        values.push(employee_id);

        updates.push(`status = $${values.length + 1}`);
        values.push("assigned");

        updates.push(`last_updated = $${values.length + 1}`);
        values.push(new Date());
    }
    if (name) {
        updates.push(`name = $${values.length + 1}`);
        values.push(name);
    }
    if (brand) {
        updates.push(`brand = $${values.length + 1}`);
        values.push(brand);
    }
    if (description) {
        updates.push(`description = $${values.length + 1}`);
        values.push(description);
    }
    if (type) {
        updates.push(`type = $${values.length + 1}`);
        values.push(type);
    }
    if (location) {
        updates.push(`location = $${values.length + 1}`);
        values.push(location);
    }

    query += updates.join(", ");
    query += ` WHERE id = $${values.length + 1}`;
    values.push(id);

    return pool.query(query, values);
};

//todo :: Find a better way of writing this query
export const updateEmployeeQuery = async (
    employeeId: string,
    email?: string,
    firstname?: string,
    lastname?: string,
    location?: string,
    phone_number?: string
): Promise<any> => {
    let query = `UPDATE employees
                 SET `;
    const updates: string[] = [];
    const values: any[] = [];

    if (email) {
        updates.push(`email = $${values.length + 1}`);
        values.push(email);
    }

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
    query += ` WHERE id = $${values.length + 1}`;
    values.push(employeeId);

    return pool.query(query, values);
};


export const getEmployeeByIdQuery = async (employeeId: number) => {
    const query = `SELECT *
                   from employees
                   WHERE id = $1`;
    const values = [employeeId];
    try {
        // const result = await pool.query<Object>(query, values);
        const result = await pool.query(query, values);
        return result; //null

    } catch (err) {
        console.log('error getting employeeId ' + err);
        throw err;
    }
}


export const getAssetByIdQuery = async (assetId: string) => {
    const query = `SELECT *
                   from assets
                   WHERE id = $1`;
    const values = [assetId];
    try {
        // const result = await pool.query<Object>(query, values);
        const result = await pool.query(query, values);
        return result; //null

    } catch (err) {
        console.log('error getting assetId ' + err);
        throw err;
    }
}

export const getAssetHistoryQuery = async (assetId: string) => {
    // return await pool.query(`SELECT * FROM employee_assets_history WHERE asset_id = ${assetId}`);

    const query = `SELECT a.name, a.brand, e.firstname || e.lastname as assigned_to, a.created_at, h.from_date, h.to_date
                   from employee_assets_history h
                   inner join assets a on h.asset_id = a.id
                   inner join employees e on h.employee_id = e.id
                   WHERE asset_id = $1 ORDER BY from_date DESC `;
    const values = [assetId];
    try {
        const result = await pool.query(query, values);
        return result;

    } catch (err) {
        console.log('error getting assetId ' + err);
        throw err;
    }

}


