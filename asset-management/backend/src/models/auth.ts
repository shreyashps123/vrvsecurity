import pool from "../db/pool";

interface User{
    id:number
}
export const verifyUser = async(user:User)=> {
    const query = `select id
                  from employees
                  where id = $1 and status = $2`
    const result = await pool.query(query, [user.id,'active'])
    return result.rowCount;
}