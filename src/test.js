// import pool from "./database/pool.js";

// let doQ = async () => {
//     const sql = `SELECT * FROM QUAN WHERE TenQuan = 'Quan Binh Tan';`;
//     try {
//         const res = await pool.query(sql);
//         console.log(res[0]);
//     } catch (err) {
//         console.log('Error: ', err);
//     }
// }

// doQ().then().catch((err) => console.log('Error: ', err));
import moment from "moment";

const timestamp = new Date()

const formattedTimestamp = moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
console.log(typeof (formattedTimestamp));
console.log(formattedTimestamp);

const parsedTimestamp = moment(formattedTimestamp).toDate()
console.log(typeof (parsedTimestamp));
console.log(parsedTimestamp);