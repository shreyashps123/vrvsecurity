import pool from "../db/pool";


export const getProfileQuery = async(employeeId:string) =>{
    const query = `SELECT firstname, lastname, email, phone_number, date_of_joining, location FROM employees where id=$1`;
    const values = [employeeId];
    try{
        const result = await pool.query(query,values);
        return result.rows;
    }
    catch(err){
        console.log("error while fetching profile: "+err);
        throw err;
    }
}