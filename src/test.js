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

// const obj = {
//     1: "dk",
//     2: "ab"
// };

// console.log(obj); // Output: "dk"
// console.log(obj[2]); // Output: "ab"

// doQ().then().catch((err) => console.log('Error: ', err));
// import moment from "moment";

// const timestamp = new Date()

// const formattedTimestamp = moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
// console.log(typeof (formattedTimestamp));
// console.log(formattedTimestamp);

// const parsedTimestamp = moment(formattedTimestamp).toDate()
// console.log(typeof (parsedTimestamp));
// console.log(parsedTimestamp);

const objects = [
    { MaPhieuXuat: 1, NgayLapPhieu: '2023-01-01', TongTien: 100, MaDaiLy: 1 },
    { MaPhieuXuat: 2, NgayLapPhieu: '2023-01-02', TongTien: 200, MaDaiLy: 2 },
    { MaPhieuXuat: 3, NgayLapPhieu: '2023-01-03', TongTien: 150, MaDaiLy: 1 },
    { MaPhieuXuat: 4, NgayLapPhieu: '2023-01-04', TongTien: 300, MaDaiLy: 3 },
    { MaPhieuXuat: 5, NgayLapPhieu: '2023-01-05', TongTien: 250, MaDaiLy: 2 }
];

const sumsByMaDaiLy = {};
const countsByMaDaiLy = {};

for (const obj of objects) {
    const { MaDaiLy, TongTien } = obj;

    // Tính tổng tiền cho MaDaiLy
    if (sumsByMaDaiLy[MaDaiLy]) {
        sumsByMaDaiLy[MaDaiLy] += TongTien;
    } else {
        sumsByMaDaiLy[MaDaiLy] = TongTien;
    }

    // Tăng số lượng đối tượng cho MaDaiLy
    if (countsByMaDaiLy[MaDaiLy]) {
        countsByMaDaiLy[MaDaiLy] += 1;
    } else {
        countsByMaDaiLy[MaDaiLy] = 1;
    }
}

console.log(sumsByMaDaiLy);   // Tổng tiền theo MaDaiLy { '1': 250, '2': 450, '3': 300 }
console.log(countsByMaDaiLy); // Số lượng đối tượng theo MaDaiLy { '1': 2, '2': 2, '3': 1 }