import pool from '../db/pool';
// const pool = require('../db/pool')

const findUser = async (username: string) => {
    try {
        const result = await pool.query(
            `SELECT * FROM employees WHERE email = $1 AND (role = 'admin' or role='employee')`,
            [username]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error querying database:', error);
        throw error;
    }
};

export default {
    findUser,
};