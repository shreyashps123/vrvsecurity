import pool from "../db/pool";
import bcrypt from "bcryptjs";


export const getPassword = async (employeeId: string) => {
    const query = `SELECT password
                   FROM employees
                   WHERE id = $1`;
    const values = [employeeId];
    try {
        const result = await pool.query(query, values);
        return result.rows.length > 0 ? result.rows[0].password : -1;
    } catch (err) {
        console.log('error getting assets: ' + err);
        throw err;
    }
}

export const updatePasswordQuery = async (newPassword: string, employeeId: string) => {
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    const query = `UPDATE employees
                   SET password = $2
                   WHERE id = $1
                   RETURNING id`;
    const values = [employeeId, hashedPassword];
    try {
        const result = await pool.query(query, values);
        return result.rows.length > 0 ? 1 : -1;
    } catch (err) {
        console.log('error getting assets: ' + err);
        throw err;
    }
}