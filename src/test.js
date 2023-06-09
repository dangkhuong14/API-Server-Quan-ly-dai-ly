import pool from "./database/pool.js";

let doQ = async () => {
    const sql = `SELECT * FROM QUAN WHERE TenQuan = 'Quan Binh Tan';`;
    try {
        const res = await pool.query(sql);
        console.log(res[0]);
    } catch (err) {
        console.log('Error: ', err);
    }
}

doQ().then().catch((err) => console.log('Error: ', err));