const graphql = require('graphql');
const pool = require('../db/sql_pool.js');

const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const DailyType = new GraphQLObjectType({
    name: 'Daily',
    fields: () => ({
        MaDaiLy: { type: GraphQLID },
        TenDaiLy: { type: new GraphQLNonNull(GraphQLString) },
        DienThoai: { type: new GraphQLNonNull(GraphQLString) },
        DiaChi: { type: new GraphQLNonNull(GraphQLString) },
        NgayTiepNhan: { type: new GraphQLNonNull(GraphQLString) },
        TienNo: { type: GraphQLInt },
        Email: { type: GraphQLString },
        MaQuan: { type: new GraphQLNonNull(GraphQLID) },
        relatedQuan: {
            type: QuanType,
            resolve(parent, args) {
                const sql = `SELECT * FROM "Quan" WHERE "MaQuan" = '${parent.MaQuan}';`
                return pool.query(sql)
                    .then(res => res.rows[0])
                    .catch(err => console.log('Error: ', err))
            }
        },
        MaLoaiDaiLy: { type: new GraphQLNonNull(GraphQLID) },
        relatedLoaidaily: {
            type: LoaidailyType,
            resolve(parent, args) {
                const sql = `SELECT * FROM "Loaidaily" WHERE "MaLoaiDaiLy" = '${parent.MaLoaiDaiLy}';`
                return pool.query(sql)
                    .then(res => res.rows[0])
                    .catch(err => console.log('Error: ', err))
            }
        }
    })
});

const QuanType = new GraphQLObjectType({
    name: 'Quan',
    fields: () => ({
        MaQuan: { type: GraphQLID },
        TenQuan: { type: new GraphQLNonNull(GraphQLString) }
    })
});

const LoaidailyType = new GraphQLObjectType({
    name: 'Loaidaily',
    fields: () => ({
        MaLoaiDaiLy: { type: GraphQLID },
        TenLoaiDaiLy: { type: new GraphQLNonNull(GraphQLString) },
        SoNoToiDa: { type: new GraphQLNonNull(GraphQLInt) }
    })
});

const DvtType = new GraphQLObjectType({
    name: 'Dvt',
    fields: () => ({
        MaDVT: { type: GraphQLID },
        TenDVT: { type: new GraphQLNonNull(GraphQLString) }
    })
});

const PhieunhaphangType = new GraphQLObjectType({
    name: 'Phieunhaphang',
    fields: () => ({
        MaPhieuNhap: { type: GraphQLID },
        SoLuong: { type: new GraphQLNonNull(GraphQLInt) },
        MaMatHang: { type: new GraphQLNonNull(GraphQLID) },
        relatedMathang: {
            type: MathangType,
            resolve(parent, args) {
                const sql = `SELECT * FROM "Mathang" WHERE "MaMatHang" = '${parent.MaMatHang}';`
                return pool.query(sql)
                    .then(res => res.rows[0])
                    .catch(err => console.log('Error: ', err))
            }
        }
    })
});

const MathangType = new GraphQLObjectType({
    name: 'Mathang',
    fields: () => ({
        MaMatHang: { type: GraphQLID },
        TenMatHang: { type: new GraphQLNonNull(GraphQLString) },
        SoLuongTon: { type: new GraphQLNonNull(GraphQLInt) },
        DonGiaNhap: { type: new GraphQLNonNull(GraphQLInt) },
        MaDVT: { type: new GraphQLNonNull(GraphQLID) },
        relatedDvt: {
            type: DvtType,
            resolve(parent, args) {
                const sql = `SELECT * FROM "Dvt" WHERE "MaDVT" = '${parent.MaDVT}';`
                return pool.query(sql)
                    .then(res => res.rows[0])
                    .catch(err => console.log('Error: ', err))
            }
        }
    })
});

const PhieuxuathangType = new GraphQLObjectType({
    name: 'Phieuxuathang',
    fields: () => ({
        MaPhieuXuat: { type: GraphQLID },
        NgayLapPhieu: { type: new GraphQLNonNull(GraphQLString) },
        TongTien: { type: new GraphQLNonNull(GraphQLInt) },
        MaDaiLy: { type: new GraphQLNonNull(GraphQLID) },
        relatedDaily: {
            type: DailyType,
            resolve(parent, args) {
                const sql = `SELECT * FROM "Daily" WHERE "MaDaiLy" = '${parent.MaDaiLy}';`
                return pool.query(sql)
                    .then(res => res.rows[0])
                    .catch(err => console.log('Error: ', err))
            }
        }
    })
});

const Ct_phieuxuathangType = new GraphQLObjectType({
    name: 'Ct_phieuxuathang',
    fields: () => ({
        MaCT_PXH: { type: GraphQLID },
        MaPhieuXuat: { type: new GraphQLNonNull(GraphQLID) },
        relatedPhieuxuathang: {
            type: PhieuxuathangType,
            resolve(parent, args) {
                const sql = `SELECT * FROM "Phieuxuathang" WHERE "MaPhieuXuat" = '${parent.MaPhieuXuat}';`
                return pool.query(sql)
                    .then(res => res.rows[0])
                    .catch(err => console.log('Error: ', err))
            }
        },
        MaMatHang: { type: new GraphQLNonNull(GraphQLID) },
        relatedMathang: {
            type: MathangType,
            resolve(parent, args) {
                const sql = `SELECT * FROM "Mathang" WHERE "MaMatHang" = '${parent.MaMatHang}';`
                return pool.query(sql)
                    .then(res => res.rows[0])
                    .catch(err => console.log('Error: ', err))
            }
        }
    })
});

const BaocaodoanhsoType = new GraphQLObjectType({
    name: 'Baocaodoanhso',
    fields: () => ({
        MaBaoCaoDoanhSo: { type: GraphQLID },
        Thang: { type: new GraphQLNonNull(GraphQLString) }
    })
});

const Ct_bcdsType = new GraphQLObjectType({
    name: 'Ct_bcds',
    fields: () => ({
        MaCT_BCDS: { type: GraphQLID },
        MaBaoCaoDoanhSo: { type: new GraphQLNonNull(GraphQLID) },
        relatedBaocaodoanhso: {
            type: BaocaodoanhsoType,
            resolve(parent, args) {
                const sql = `SELECT * FROM "Baocaodoanhso" WHERE "MaBaoCaoDoanhSo" = '${parent.MaBaoCaoDoanhSo}';`
                return pool.query(sql)
                    .then(res => res.rows[0])
                    .catch(err => console.log('Error: ', err))
            }
        },
        MaDaiLy: { type: new GraphQLNonNull(GraphQLID) },
        relatedDaily: {
            type: DailyType,
            resolve(parent, args) {
                const sql = `SELECT * FROM "Daily" WHERE "MaDaiLy" = '${parent.MaDaiLy}';`
                return pool.query(sql)
                    .then(res => res.rows[0])
                    .catch(err => console.log('Error: ', err))
            }
        },
        SoPhieuXuat: { type: new GraphQLNonNull(GraphQLInt) },
        TongTriGia: { type: new GraphQLNonNull(GraphQLInt) },
        Tyle: { type: new GraphQLNonNull(GraphQLInt) }
    })
});

const PhieuthutienType = new GraphQLObjectType({
    name: 'Phieuthutien',
    fields: () => ({
        MaPhieuThuTien: { type: GraphQLID },
        MaDaiLy: { type: new GraphQLNonNull(GraphQLID) },
        relatedDaily: {
            type: DailyType,
            resolve(parent, args) {
                const sql = `SELECT * FROM "Daily" WHERE "MaDaiLy" = '${parent.MaDaiLy}';`
                return pool.query(sql)
                    .then(res => res.rows[0])
                    .catch(err => console.log('Error: ', err))
            }
        },
        NgayThuTien: { type: new GraphQLNonNull(GraphQLString) },
        SoTienThu: { type: new GraphQLNonNull(GraphQLInt) }
    })
});

const BaocaocongnoType = new GraphQLObjectType({
    name: 'Baocaocongno',
    fields: () => ({
        MaBaoCaoCongNo: { type: GraphQLID },
        Thang: { type: new GraphQLNonNull(GraphQLString) }
    })
});

const Ct_bccnType = new GraphQLObjectType({
    name: 'Ct_bccn',
    fields: () => ({
        MaCT_BCCN: { type: GraphQLID },
        MaBaoCaoCongNo: { type: new GraphQLNonNull(GraphQLID) },
        relatedBaocaocongno: {
            type: BaocaocongnoType,
            resolve(parent, args) {
                const sql = `SELECT * FROM "Baocaocongno" WHERE "MaBaoCaoCongNo" = '${parent.MaBaoCaoCongNo}';`
                return pool.query(sql)
                    .then(res => res.rows[0])
                    .catch(err => console.log('Error: ', err))
            }
        },
        MaDaiLy: { type: new GraphQLNonNull(GraphQLID) },
        relatedDaily: {
            type: DailyType,
            resolve(parent, args) {
                const sql = `SELECT * FROM "Daily" WHERE "MaDaiLy" = '${parent.MaDaiLy}';`
                return pool.query(sql)
                    .then(res => res.rows[0])
                    .catch(err => console.log('Error: ', err))
            }
        },
        NoDau: { type: new GraphQLNonNull(GraphQLInt) },
        PhatSinh: { type: new GraphQLNonNull(GraphQLInt) },
        NoCuoi: { type: new GraphQLNonNull(GraphQLInt) }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        everyDaily: {
            type: new GraphQLList(DailyType),
            resolve() {
                const sql = `SELECT * FROM "Daily";`
                return pool.query(sql)
                    .then(res => res.rows)
                    .catch(err => console.log('Error: ', err))
            }
        },
        daily: {
            type: DailyType,
            args: { MaDaiLy: { type: GraphQLID } },
            resolve(parent, args) {
                const sql = `SELECT * FROM "Daily" WHERE MaDaiLy = '${args.id}';`;
                return pool.query(sql)
                    .then(res => res.rows[0])
                    .catch(err => console.log('Error: ', err))
            }
        },
        everyQuan: {
            type: new GraphQLList(QuanType),
            resolve() {
                const sql = `SELECT * FROM "Quan";`
                return pool.query(sql)
                    .then(res => res.rows)
                    .catch(err => console.log('Error: ', err))
            }
        },
        quan: {
            type: QuanType,
            args: { MaQuan: { type: GraphQLID } },
            resolve(parent, args) {
                const sql = `SELECT * FROM "Quan" WHERE MaQuan = '${args.id}';`;
                return pool.query(sql)
                    .then(res => res.rows[0])
                    .catch(err => console.log('Error: ', err))
            }
        },
        everyLoaidaily: {
            type: new GraphQLList(LoaidailyType),
            resolve() {
                const sql = `SELECT * FROM "Loaidaily";`
                return pool.query(sql)
                    .then(res => res.rows)
                    .catch(err => console.log('Error: ', err))
            }
        },
        loaidaily: {
            type: LoaidailyType,
            args: { MaLoaiDaiLy: { type: GraphQLID } },
            resolve(parent, args) {
                const sql = `SELECT * FROM "Loaidaily" WHERE MaLoaiDaiLy = '${args.id}';`;
                return pool.query(sql)
                    .then(res => res.rows[0])
                    .catch(err => console.log('Error: ', err))
            }
        },
        everyDvt: {
            type: new GraphQLList(DvtType),
            resolve() {
                const sql = `SELECT * FROM "Dvt";`
                return pool.query(sql)
                    .then(res => res.rows)
                    .catch(err => console.log('Error: ', err))
            }
        },
        dvt: {
            type: DvtType,
            args: { MaDVT: { type: GraphQLID } },
            resolve(parent, args) {
                const sql = `SELECT * FROM "Dvt" WHERE MaDVT = '${args.id}';`;
                return pool.query(sql)
                    .then(res => res.rows[0])
                    .catch(err => console.log('Error: ', err))
            }
        },
        everyPhieunhaphang: {
            type: new GraphQLList(PhieunhaphangType),
            resolve() {
                const sql = `SELECT * FROM "Phieunhaphang";`
                return pool.query(sql)
                    .then(res => res.rows)
                    .catch(err => console.log('Error: ', err))
            }
        },
        phieunhaphang: {
            type: PhieunhaphangType,
            args: { MaPhieuNhap: { type: GraphQLID } },
            resolve(parent, args) {
                const sql = `SELECT * FROM "Phieunhaphang" WHERE MaPhieuNhap = '${args.id}';`;
                return pool.query(sql)
                    .then(res => res.rows[0])
                    .catch(err => console.log('Error: ', err))
            }
        },
        everyMathang: {
            type: new GraphQLList(MathangType),
            resolve() {
                const sql = `SELECT * FROM "Mathang";`
                return pool.query(sql)
                    .then(res => res.rows)
                    .catch(err => console.log('Error: ', err))
            }
        },
        mathang: {
            type: MathangType,
            args: { MaMatHang: { type: GraphQLID } },
            resolve(parent, args) {
                const sql = `SELECT * FROM "Mathang" WHERE MaMatHang = '${args.id}';`;
                return pool.query(sql)
                    .then(res => res.rows[0])
                    .catch(err => console.log('Error: ', err))
            }
        },
        everyPhieuxuathang: {
            type: new GraphQLList(PhieuxuathangType),
            resolve() {
                const sql = `SELECT * FROM "Phieuxuathang";`
                return pool.query(sql)
                    .then(res => res.rows)
                    .catch(err => console.log('Error: ', err))
            }
        },
        phieuxuathang: {
            type: PhieuxuathangType,
            args: { MaPhieuXuat: { type: GraphQLID } },
            resolve(parent, args) {
                const sql = `SELECT * FROM "Phieuxuathang" WHERE MaPhieuXuat = '${args.id}';`;
                return pool.query(sql)
                    .then(res => res.rows[0])
                    .catch(err => console.log('Error: ', err))
            }
        },
        everyCt_phieuxuathang: {
            type: new GraphQLList(Ct_phieuxuathangType),
            resolve() {
                const sql = `SELECT * FROM "Ct_phieuxuathang";`
                return pool.query(sql)
                    .then(res => res.rows)
                    .catch(err => console.log('Error: ', err))
            }
        },
        ct_phieuxuathang: {
            type: Ct_phieuxuathangType,
            args: { MaCT_PXH: { type: GraphQLID } },
            resolve(parent, args) {
                const sql = `SELECT * FROM "Ct_phieuxuathang" WHERE MaCT_PXH = '${args.id}';`;
                return pool.query(sql)
                    .then(res => res.rows[0])
                    .catch(err => console.log('Error: ', err))
            }
        },
        everyBaocaodoanhso: {
            type: new GraphQLList(BaocaodoanhsoType),
            resolve() {
                const sql = `SELECT * FROM "Baocaodoanhso";`
                return pool.query(sql)
                    .then(res => res.rows)
                    .catch(err => console.log('Error: ', err))
            }
        },
        baocaodoanhso: {
            type: BaocaodoanhsoType,
            args: { MaBaoCaoDoanhSo: { type: GraphQLID } },
            resolve(parent, args) {
                const sql = `SELECT * FROM "Baocaodoanhso" WHERE MaBaoCaoDoanhSo = '${args.id}';`;
                return pool.query(sql)
                    .then(res => res.rows[0])
                    .catch(err => console.log('Error: ', err))
            }
        },
        everyCt_bcds: {
            type: new GraphQLList(Ct_bcdsType),
            resolve() {
                const sql = `SELECT * FROM "Ct_bcds";`
                return pool.query(sql)
                    .then(res => res.rows)
                    .catch(err => console.log('Error: ', err))
            }
        },
        ct_bcds: {
            type: Ct_bcdsType,
            args: { MaCT_BCDS: { type: GraphQLID } },
            resolve(parent, args) {
                const sql = `SELECT * FROM "Ct_bcds" WHERE MaCT_BCDS = '${args.id}';`;
                return pool.query(sql)
                    .then(res => res.rows[0])
                    .catch(err => console.log('Error: ', err))
            }
        },
        everyPhieuthutien: {
            type: new GraphQLList(PhieuthutienType),
            resolve() {
                const sql = `SELECT * FROM "Phieuthutien";`
                return pool.query(sql)
                    .then(res => res.rows)
                    .catch(err => console.log('Error: ', err))
            }
        },
        phieuthutien: {
            type: PhieuthutienType,
            args: { MaPhieuThuTien: { type: GraphQLID } },
            resolve(parent, args) {
                const sql = `SELECT * FROM "Phieuthutien" WHERE MaPhieuThuTien = '${args.id}';`;
                return pool.query(sql)
                    .then(res => res.rows[0])
                    .catch(err => console.log('Error: ', err))
            }
        },
        everyBaocaocongno: {
            type: new GraphQLList(BaocaocongnoType),
            resolve() {
                const sql = `SELECT * FROM "Baocaocongno";`
                return pool.query(sql)
                    .then(res => res.rows)
                    .catch(err => console.log('Error: ', err))
            }
        },
        baocaocongno: {
            type: BaocaocongnoType,
            args: { MaBaoCaoCongNo: { type: GraphQLID } },
            resolve(parent, args) {
                const sql = `SELECT * FROM "Baocaocongno" WHERE MaBaoCaoCongNo = '${args.id}';`;
                return pool.query(sql)
                    .then(res => res.rows[0])
                    .catch(err => console.log('Error: ', err))
            }
        },
        everyCt_bccn: {
            type: new GraphQLList(Ct_bccnType),
            resolve() {
                const sql = `SELECT * FROM "Ct_bccn";`
                return pool.query(sql)
                    .then(res => res.rows)
                    .catch(err => console.log('Error: ', err))
            }
        },
        ct_bccn: {
            type: Ct_bccnType,
            args: { MaCT_BCCN: { type: GraphQLID } },
            resolve(parent, args) {
                const sql = `SELECT * FROM "Ct_bccn" WHERE MaCT_BCCN = '${args.id}';`;
                return pool.query(sql)
                    .then(res => res.rows[0])
                    .catch(err => console.log('Error: ', err))
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addDaily: {
            type: DailyType,
            args: {
                MaDaiLy: { type: GraphQLID },
                TenDaiLy: { type: new GraphQLNonNull(GraphQLString) },
                DienThoai: { type: new GraphQLNonNull(GraphQLString) },
                DiaChi: { type: new GraphQLNonNull(GraphQLString) },
                NgayTiepNhan: { type: new GraphQLNonNull(GraphQLString) },
                TienNo: { type: GraphQLInt },
                Email: { type: GraphQLString },
                MaQuan: { type: new GraphQLNonNull(GraphQLID) },
                MaLoaiDaiLy: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                const columns = Object.keys(args).map(el => `"${el}"`);
                const values = Object.values(args).map(el => `'${el}'`);
                const sql = `INSERT INTO "Daily" (${columns}) VALUES (${values}) RETURNING *`;
                return pool.connect()
                    .then(client => {
                        return client.query(sql)
                            .then(res => {
                                client.release();
                                return res.rows[0];
                            })
                            .catch(err => {
                                client.release();
                                console.log('Error: ', err);
                            })
                    })
            }
        },
        updateDaily: {
            type: DailyType,
            args: {
                MaDaiLy: { type: GraphQLID },
                TenDaiLy: { type: new GraphQLNonNull(GraphQLString) },
                DienThoai: { type: new GraphQLNonNull(GraphQLString) },
                DiaChi: { type: new GraphQLNonNull(GraphQLString) },
                NgayTiepNhan: { type: new GraphQLNonNull(GraphQLString) },
                TienNo: { type: GraphQLInt },
                Email: { type: GraphQLString },
                MaQuan: { type: new GraphQLNonNull(GraphQLID) },
                MaLoaiDaiLy: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let updateValues = '';
                for (const prop in args) {
                    if (updateValues.length > 0) updateValues += `, `;
                    updateValues += `"${prop}" = '${args[prop]}' `;
                }
                const sql = `UPDATE "Daily" SET ${updateValues} WHERE id = '${args.id}' RETURNING *;`
                return pool.connect()
                    .then(client => {
                        return client.query(sql)
                            .then(res => {
                                client.release();
                                return res.rows[0];
                            })
                            .catch(err => {
                                client.release();
                                console.log('Error: ', err);
                            })
                    })
            }
        },
        deleteDaily: {
            type: DailyType,
            args: { MaDaiLy: { type: GraphQLID } },
            resolve(parent, args) {
                const sql = `DELETE FROM "Daily" WHERE id = '${args.id}' RETURNING *;`
                return pool.connect()
                    .then(client => {
                        return client.query(sql)
                            .then(res => {
                                client.release();
                                return res.rows[0];
                            })
                            .catch(err => {
                                client.release();
                                console.log('Error: ', err);
                            })
                    })
            }
        },
        addQuan: {
            type: QuanType,
            args: {
                MaQuan: { type: GraphQLID },
                TenQuan: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                const columns = Object.keys(args).map(el => `"${el}"`);
                const values = Object.values(args).map(el => `'${el}'`);
                const sql = `INSERT INTO "Quan" (${columns}) VALUES (${values}) RETURNING *`;
                return pool.connect()
                    .then(client => {
                        return client.query(sql)
                            .then(res => {
                                client.release();
                                return res.rows[0];
                            })
                            .catch(err => {
                                client.release();
                                console.log('Error: ', err);
                            })
                    })
            }
        },
        updateQuan: {
            type: QuanType,
            args: {
                MaQuan: { type: GraphQLID },
                TenQuan: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let updateValues = '';
                for (const prop in args) {
                    if (updateValues.length > 0) updateValues += `, `;
                    updateValues += `"${prop}" = '${args[prop]}' `;
                }
                const sql = `UPDATE "Quan" SET ${updateValues} WHERE id = '${args.id}' RETURNING *;`
                return pool.connect()
                    .then(client => {
                        return client.query(sql)
                            .then(res => {
                                client.release();
                                return res.rows[0];
                            })
                            .catch(err => {
                                client.release();
                                console.log('Error: ', err);
                            })
                    })
            }
        },
        deleteQuan: {
            type: QuanType,
            args: { MaQuan: { type: GraphQLID } },
            resolve(parent, args) {
                const sql = `DELETE FROM "Quan" WHERE id = '${args.id}' RETURNING *;`
                return pool.connect()
                    .then(client => {
                        return client.query(sql)
                            .then(res => {
                                client.release();
                                return res.rows[0];
                            })
                            .catch(err => {
                                client.release();
                                console.log('Error: ', err);
                            })
                    })
            }
        },
        addLoaidaily: {
            type: LoaidailyType,
            args: {
                MaLoaiDaiLy: { type: GraphQLID },
                TenLoaiDaiLy: { type: new GraphQLNonNull(GraphQLString) },
                SoNoToiDa: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                const columns = Object.keys(args).map(el => `"${el}"`);
                const values = Object.values(args).map(el => `'${el}'`);
                const sql = `INSERT INTO "Loaidaily" (${columns}) VALUES (${values}) RETURNING *`;
                return pool.connect()
                    .then(client => {
                        return client.query(sql)
                            .then(res => {
                                client.release();
                                return res.rows[0];
                            })
                            .catch(err => {
                                client.release();
                                console.log('Error: ', err);
                            })
                    })
            }
        },
        updateLoaidaily: {
            type: LoaidailyType,
            args: {
                MaLoaiDaiLy: { type: GraphQLID },
                TenLoaiDaiLy: { type: new GraphQLNonNull(GraphQLString) },
                SoNoToiDa: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                let updateValues = '';
                for (const prop in args) {
                    if (updateValues.length > 0) updateValues += `, `;
                    updateValues += `"${prop}" = '${args[prop]}' `;
                }
                const sql = `UPDATE "Loaidaily" SET ${updateValues} WHERE id = '${args.id}' RETURNING *;`
                return pool.connect()
                    .then(client => {
                        return client.query(sql)
                            .then(res => {
                                client.release();
                                return res.rows[0];
                            })
                            .catch(err => {
                                client.release();
                                console.log('Error: ', err);
                            })
                    })
            }
        },
        deleteLoaidaily: {
            type: LoaidailyType,
            args: { MaLoaiDaiLy: { type: GraphQLID } },
            resolve(parent, args) {
                const sql = `DELETE FROM "Loaidaily" WHERE id = '${args.id}' RETURNING *;`
                return pool.connect()
                    .then(client => {
                        return client.query(sql)
                            .then(res => {
                                client.release();
                                return res.rows[0];
                            })
                            .catch(err => {
                                client.release();
                                console.log('Error: ', err);
                            })
                    })
            }
        },
        addDvt: {
            type: DvtType,
            args: {
                MaDVT: { type: GraphQLID },
                TenDVT: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                const columns = Object.keys(args).map(el => `"${el}"`);
                const values = Object.values(args).map(el => `'${el}'`);
                const sql = `INSERT INTO "Dvt" (${columns}) VALUES (${values}) RETURNING *`;
                return pool.connect()
                    .then(client => {
                        return client.query(sql)
                            .then(res => {
                                client.release();
                                return res.rows[0];
                            })
                            .catch(err => {
                                client.release();
                                console.log('Error: ', err);
                            })
                    })
            }
        },
        updateDvt: {
            type: DvtType,
            args: {
                MaDVT: { type: GraphQLID },
                TenDVT: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let updateValues = '';
                for (const prop in args) {
                    if (updateValues.length > 0) updateValues += `, `;
                    updateValues += `"${prop}" = '${args[prop]}' `;
                }
                const sql = `UPDATE "Dvt" SET ${updateValues} WHERE id = '${args.id}' RETURNING *;`
                return pool.connect()
                    .then(client => {
                        return client.query(sql)
                            .then(res => {
                                client.release();
                                return res.rows[0];
                            })
                            .catch(err => {
                                client.release();
                                console.log('Error: ', err);
                            })
                    })
            }
        },
        deleteDvt: {
            type: DvtType,
            args: { MaDVT: { type: GraphQLID } },
            resolve(parent, args) {
                const sql = `DELETE FROM "Dvt" WHERE id = '${args.id}' RETURNING *;`
                return pool.connect()
                    .then(client => {
                        return client.query(sql)
                            .then(res => {
                                client.release();
                                return res.rows[0];
                            })
                            .catch(err => {
                                client.release();
                                console.log('Error: ', err);
                            })
                    })
            }
        },
        addPhieunhaphang: {
            type: PhieunhaphangType,
            args: {
                MaPhieuNhap: { type: GraphQLID },
                SoLuong: { type: new GraphQLNonNull(GraphQLInt) },
                MaMatHang: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                const columns = Object.keys(args).map(el => `"${el}"`);
                const values = Object.values(args).map(el => `'${el}'`);
                const sql = `INSERT INTO "Phieunhaphang" (${columns}) VALUES (${values}) RETURNING *`;
                return pool.connect()
                    .then(client => {
                        return client.query(sql)
                            .then(res => {
                                client.release();
                                return res.rows[0];
                            })
                            .catch(err => {
                                client.release();
                                console.log('Error: ', err);
                            })
                    })
            }
        },
        updatePhieunhaphang: {
            type: PhieunhaphangType,
            args: {
                MaPhieuNhap: { type: GraphQLID },
                SoLuong: { type: new GraphQLNonNull(GraphQLInt) },
                MaMatHang: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let updateValues = '';
                for (const prop in args) {
                    if (updateValues.length > 0) updateValues += `, `;
                    updateValues += `"${prop}" = '${args[prop]}' `;
                }
                const sql = `UPDATE "Phieunhaphang" SET ${updateValues} WHERE id = '${args.id}' RETURNING *;`
                return pool.connect()
                    .then(client => {
                        return client.query(sql)
                            .then(res => {
                                client.release();
                                return res.rows[0];
                            })
                            .catch(err => {
                                client.release();
                                console.log('Error: ', err);
                            })
                    })
            }
        },
        deletePhieunhaphang: {
            type: PhieunhaphangType,
            args: { MaPhieuNhap: { type: GraphQLID } },
            resolve(parent, args) {
                const sql = `DELETE FROM "Phieunhaphang" WHERE id = '${args.id}' RETURNING *;`
                return pool.connect()
                    .then(client => {
                        return client.query(sql)
                            .then(res => {
                                client.release();
                                return res.rows[0];
                            })
                            .catch(err => {
                                client.release();
                                console.log('Error: ', err);
                            })
                    })
            }
        },
        addMathang: {
            type: MathangType,
            args: {
                MaMatHang: { type: GraphQLID },
                TenMatHang: { type: new GraphQLNonNull(GraphQLString) },
                SoLuongTon: { type: new GraphQLNonNull(GraphQLInt) },
                DonGiaNhap: { type: new GraphQLNonNull(GraphQLInt) },
                MaDVT: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                const columns = Object.keys(args).map(el => `"${el}"`);
                const values = Object.values(args).map(el => `'${el}'`);
                const sql = `INSERT INTO "Mathang" (${columns}) VALUES (${values}) RETURNING *`;
                return pool.connect()
                    .then(client => {
                        return client.query(sql)
                            .then(res => {
                                client.release();
                                return res.rows[0];
                            })
                            .catch(err => {
                                client.release();
                                console.log('Error: ', err);
                            })
                    })
            }
        },
        updateMathang: {
            type: MathangType,
            args: {
                MaMatHang: { type: GraphQLID },
                TenMatHang: { type: new GraphQLNonNull(GraphQLString) },
                SoLuongTon: { type: new GraphQLNonNull(GraphQLInt) },
                DonGiaNhap: { type: new GraphQLNonNull(GraphQLInt) },
                MaDVT: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let updateValues = '';
                for (const prop in args) {
                    if (updateValues.length > 0) updateValues += `, `;
                    updateValues += `"${prop}" = '${args[prop]}' `;
                }
                const sql = `UPDATE "Mathang" SET ${updateValues} WHERE id = '${args.id}' RETURNING *;`
                return pool.connect()
                    .then(client => {
                        return client.query(sql)
                            .then(res => {
                                client.release();
                                return res.rows[0];
                            })
                            .catch(err => {
                                client.release();
                                console.log('Error: ', err);
                            })
                    })
            }
        },
        deleteMathang: {
            type: MathangType,
            args: { MaMatHang: { type: GraphQLID } },
            resolve(parent, args) {
                const sql = `DELETE FROM "Mathang" WHERE id = '${args.id}' RETURNING *;`
                return pool.connect()
                    .then(client => {
                        return client.query(sql)
                            .then(res => {
                                client.release();
                                return res.rows[0];
                            })
                            .catch(err => {
                                client.release();
                                console.log('Error: ', err);
                            })
                    })
            }
        },
        addPhieuxuathang: {
            type: PhieuxuathangType,
            args: {
                MaPhieuXuat: { type: GraphQLID },
                NgayLapPhieu: { type: new GraphQLNonNull(GraphQLString) },
                TongTien: { type: new GraphQLNonNull(GraphQLInt) },
                MaDaiLy: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                const columns = Object.keys(args).map(el => `"${el}"`);
                const values = Object.values(args).map(el => `'${el}'`);
                const sql = `INSERT INTO "Phieuxuathang" (${columns}) VALUES (${values}) RETURNING *`;
                return pool.connect()
                    .then(client => {
                        return client.query(sql)
                            .then(res => {
                                client.release();
                                return res.rows[0];
                            })
                            .catch(err => {
                                client.release();
                                console.log('Error: ', err);
                            })
                    })
            }
        },
        updatePhieuxuathang: {
            type: PhieuxuathangType,
            args: {
                MaPhieuXuat: { type: GraphQLID },
                NgayLapPhieu: { type: new GraphQLNonNull(GraphQLString) },
                TongTien: { type: new GraphQLNonNull(GraphQLInt) },
                MaDaiLy: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let updateValues = '';
                for (const prop in args) {
                    if (updateValues.length > 0) updateValues += `, `;
                    updateValues += `"${prop}" = '${args[prop]}' `;
                }
                const sql = `UPDATE "Phieuxuathang" SET ${updateValues} WHERE id = '${args.id}' RETURNING *;`
                return pool.connect()
                    .then(client => {
                        return client.query(sql)
                            .then(res => {
                                client.release();
                                return res.rows[0];
                            })
                            .catch(err => {
                                client.release();
                                console.log('Error: ', err);
                            })
                    })
            }
        },
        deletePhieuxuathang: {
            type: PhieuxuathangType,
            args: { MaPhieuXuat: { type: GraphQLID } },
            resolve(parent, args) {
                const sql = `DELETE FROM "Phieuxuathang" WHERE id = '${args.id}' RETURNING *;`
                return pool.connect()
                    .then(client => {
                        return client.query(sql)
                            .then(res => {
                                client.release();
                                return res.rows[0];
                            })
                            .catch(err => {
                                client.release();
                                console.log('Error: ', err);
                            })
                    })
            }
        },
        addCt_phieuxuathang: {
            type: Ct_phieuxuathangType,
            args: {
                MaCT_PXH: { type: GraphQLID },
                MaPhieuXuat: { type: new GraphQLNonNull(GraphQLID) },
                MaMatHang: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                const columns = Object.keys(args).map(el => `"${el}"`);
                const values = Object.values(args).map(el => `'${el}'`);
                const sql = `INSERT INTO "Ct_phieuxuathang" (${columns}) VALUES (${values}) RETURNING *`;
                return pool.connect()
                    .then(client => {
                        return client.query(sql)
                            .then(res => {
                                client.release();
                                return res.rows[0];
                            })
                            .catch(err => {
                                client.release();
                                console.log('Error: ', err);
                            })
                    })
            }
        },
        updateCt_phieuxuathang: {
            type: Ct_phieuxuathangType,
            args: {
                MaCT_PXH: { type: GraphQLID },
                MaPhieuXuat: { type: new GraphQLNonNull(GraphQLID) },
                MaMatHang: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let updateValues = '';
                for (const prop in args) {
                    if (updateValues.length > 0) updateValues += `, `;
                    updateValues += `"${prop}" = '${args[prop]}' `;
                }
                const sql = `UPDATE "Ct_phieuxuathang" SET ${updateValues} WHERE id = '${args.id}' RETURNING *;`
                return pool.connect()
                    .then(client => {
                        return client.query(sql)
                            .then(res => {
                                client.release();
                                return res.rows[0];
                            })
                            .catch(err => {
                                client.release();
                                console.log('Error: ', err);
                            })
                    })
            }
        },
        deleteCt_phieuxuathang: {
            type: Ct_phieuxuathangType,
            args: { MaCT_PXH: { type: GraphQLID } },
            resolve(parent, args) {
                const sql = `DELETE FROM "Ct_phieuxuathang" WHERE id = '${args.id}' RETURNING *;`
                return pool.connect()
                    .then(client => {
                        return client.query(sql)
                            .then(res => {
                                client.release();
                                return res.rows[0];
                            })
                            .catch(err => {
                                client.release();
                                console.log('Error: ', err);
                            })
                    })
            }
        },
        addBaocaodoanhso: {
            type: BaocaodoanhsoType,
            args: {
                MaBaoCaoDoanhSo: { type: GraphQLID },
                Thang: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                const columns = Object.keys(args).map(el => `"${el}"`);
                const values = Object.values(args).map(el => `'${el}'`);
                const sql = `INSERT INTO "Baocaodoanhso" (${columns}) VALUES (${values}) RETURNING *`;
                return pool.connect()
                    .then(client => {
                        return client.query(sql)
                            .then(res => {
                                client.release();
                                return res.rows[0];
                            })
                            .catch(err => {
                                client.release();
                                console.log('Error: ', err);
                            })
                    })
            }
        },
        updateBaocaodoanhso: {
            type: BaocaodoanhsoType,
            args: {
                MaBaoCaoDoanhSo: { type: GraphQLID },
                Thang: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let updateValues = '';
                for (const prop in args) {
                    if (updateValues.length > 0) updateValues += `, `;
                    updateValues += `"${prop}" = '${args[prop]}' `;
                }
                const sql = `UPDATE "Baocaodoanhso" SET ${updateValues} WHERE id = '${args.id}' RETURNING *;`
                return pool.connect()
                    .then(client => {
                        return client.query(sql)
                            .then(res => {
                                client.release();
                                return res.rows[0];
                            })
                            .catch(err => {
                                client.release();
                                console.log('Error: ', err);
                            })
                    })
            }
        },
        deleteBaocaodoanhso: {
            type: BaocaodoanhsoType,
            args: { MaBaoCaoDoanhSo: { type: GraphQLID } },
            resolve(parent, args) {
                const sql = `DELETE FROM "Baocaodoanhso" WHERE id = '${args.id}' RETURNING *;`
                return pool.connect()
                    .then(client => {
                        return client.query(sql)
                            .then(res => {
                                client.release();
                                return res.rows[0];
                            })
                            .catch(err => {
                                client.release();
                                console.log('Error: ', err);
                            })
                    })
            }
        },
        addCt_bcds: {
            type: Ct_bcdsType,
            args: {
                MaCT_BCDS: { type: GraphQLID },
                MaBaoCaoDoanhSo: { type: new GraphQLNonNull(GraphQLID) },
                MaDaiLy: { type: new GraphQLNonNull(GraphQLID) },
                SoPhieuXuat: { type: new GraphQLNonNull(GraphQLInt) },
                TongTriGia: { type: new GraphQLNonNull(GraphQLInt) },
                Tyle: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                const columns = Object.keys(args).map(el => `"${el}"`);
                const values = Object.values(args).map(el => `'${el}'`);
                const sql = `INSERT INTO "Ct_bcds" (${columns}) VALUES (${values}) RETURNING *`;
                return pool.connect()
                    .then(client => {
                        return client.query(sql)
                            .then(res => {
                                client.release();
                                return res.rows[0];
                            })
                            .catch(err => {
                                client.release();
                                console.log('Error: ', err);
                            })
                    })
            }
        },
        updateCt_bcds: {
            type: Ct_bcdsType,
            args: {
                MaCT_BCDS: { type: GraphQLID },
                MaBaoCaoDoanhSo: { type: new GraphQLNonNull(GraphQLID) },
                MaDaiLy: { type: new GraphQLNonNull(GraphQLID) },
                SoPhieuXuat: { type: new GraphQLNonNull(GraphQLInt) },
                TongTriGia: { type: new GraphQLNonNull(GraphQLInt) },
                Tyle: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                let updateValues = '';
                for (const prop in args) {
                    if (updateValues.length > 0) updateValues += `, `;
                    updateValues += `"${prop}" = '${args[prop]}' `;
                }
                const sql = `UPDATE "Ct_bcds" SET ${updateValues} WHERE id = '${args.id}' RETURNING *;`
                return pool.connect()
                    .then(client => {
                        return client.query(sql)
                            .then(res => {
                                client.release();
                                return res.rows[0];
                            })
                            .catch(err => {
                                client.release();
                                console.log('Error: ', err);
                            })
                    })
            }
        },
        deleteCt_bcds: {
            type: Ct_bcdsType,
            args: { MaCT_BCDS: { type: GraphQLID } },
            resolve(parent, args) {
                const sql = `DELETE FROM "Ct_bcds" WHERE id = '${args.id}' RETURNING *;`
                return pool.connect()
                    .then(client => {
                        return client.query(sql)
                            .then(res => {
                                client.release();
                                return res.rows[0];
                            })
                            .catch(err => {
                                client.release();
                                console.log('Error: ', err);
                            })
                    })
            }
        },
        addPhieuthutien: {
            type: PhieuthutienType,
            args: {
                MaPhieuThuTien: { type: GraphQLID },
                MaDaiLy: { type: new GraphQLNonNull(GraphQLID) },
                NgayThuTien: { type: new GraphQLNonNull(GraphQLString) },
                SoTienThu: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                const columns = Object.keys(args).map(el => `"${el}"`);
                const values = Object.values(args).map(el => `'${el}'`);
                const sql = `INSERT INTO "Phieuthutien" (${columns}) VALUES (${values}) RETURNING *`;
                return pool.connect()
                    .then(client => {
                        return client.query(sql)
                            .then(res => {
                                client.release();
                                return res.rows[0];
                            })
                            .catch(err => {
                                client.release();
                                console.log('Error: ', err);
                            })
                    })
            }
        },
        updatePhieuthutien: {
            type: PhieuthutienType,
            args: {
                MaPhieuThuTien: { type: GraphQLID },
                MaDaiLy: { type: new GraphQLNonNull(GraphQLID) },
                NgayThuTien: { type: new GraphQLNonNull(GraphQLString) },
                SoTienThu: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                let updateValues = '';
                for (const prop in args) {
                    if (updateValues.length > 0) updateValues += `, `;
                    updateValues += `"${prop}" = '${args[prop]}' `;
                }
                const sql = `UPDATE "Phieuthutien" SET ${updateValues} WHERE id = '${args.id}' RETURNING *;`
                return pool.connect()
                    .then(client => {
                        return client.query(sql)
                            .then(res => {
                                client.release();
                                return res.rows[0];
                            })
                            .catch(err => {
                                client.release();
                                console.log('Error: ', err);
                            })
                    })
            }
        },
        deletePhieuthutien: {
            type: PhieuthutienType,
            args: { MaPhieuThuTien: { type: GraphQLID } },
            resolve(parent, args) {
                const sql = `DELETE FROM "Phieuthutien" WHERE id = '${args.id}' RETURNING *;`
                return pool.connect()
                    .then(client => {
                        return client.query(sql)
                            .then(res => {
                                client.release();
                                return res.rows[0];
                            })
                            .catch(err => {
                                client.release();
                                console.log('Error: ', err);
                            })
                    })
            }
        },
        addBaocaocongno: {
            type: BaocaocongnoType,
            args: {
                MaBaoCaoCongNo: { type: GraphQLID },
                Thang: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                const columns = Object.keys(args).map(el => `"${el}"`);
                const values = Object.values(args).map(el => `'${el}'`);
                const sql = `INSERT INTO "Baocaocongno" (${columns}) VALUES (${values}) RETURNING *`;
                return pool.connect()
                    .then(client => {
                        return client.query(sql)
                            .then(res => {
                                client.release();
                                return res.rows[0];
                            })
                            .catch(err => {
                                client.release();
                                console.log('Error: ', err);
                            })
                    })
            }
        },
        updateBaocaocongno: {
            type: BaocaocongnoType,
            args: {
                MaBaoCaoCongNo: { type: GraphQLID },
                Thang: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let updateValues = '';
                for (const prop in args) {
                    if (updateValues.length > 0) updateValues += `, `;
                    updateValues += `"${prop}" = '${args[prop]}' `;
                }
                const sql = `UPDATE "Baocaocongno" SET ${updateValues} WHERE id = '${args.id}' RETURNING *;`
                return pool.connect()
                    .then(client => {
                        return client.query(sql)
                            .then(res => {
                                client.release();
                                return res.rows[0];
                            })
                            .catch(err => {
                                client.release();
                                console.log('Error: ', err);
                            })
                    })
            }
        },
        deleteBaocaocongno: {
            type: BaocaocongnoType,
            args: { MaBaoCaoCongNo: { type: GraphQLID } },
            resolve(parent, args) {
                const sql = `DELETE FROM "Baocaocongno" WHERE id = '${args.id}' RETURNING *;`
                return pool.connect()
                    .then(client => {
                        return client.query(sql)
                            .then(res => {
                                client.release();
                                return res.rows[0];
                            })
                            .catch(err => {
                                client.release();
                                console.log('Error: ', err);
                            })
                    })
            }
        },
        addCt_bccn: {
            type: Ct_bccnType,
            args: {
                MaCT_BCCN: { type: GraphQLID },
                MaBaoCaoCongNo: { type: new GraphQLNonNull(GraphQLID) },
                MaDaiLy: { type: new GraphQLNonNull(GraphQLID) },
                NoDau: { type: new GraphQLNonNull(GraphQLInt) },
                PhatSinh: { type: new GraphQLNonNull(GraphQLInt) },
                NoCuoi: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                const columns = Object.keys(args).map(el => `"${el}"`);
                const values = Object.values(args).map(el => `'${el}'`);
                const sql = `INSERT INTO "Ct_bccn" (${columns}) VALUES (${values}) RETURNING *`;
                return pool.connect()
                    .then(client => {
                        return client.query(sql)
                            .then(res => {
                                client.release();
                                return res.rows[0];
                            })
                            .catch(err => {
                                client.release();
                                console.log('Error: ', err);
                            })
                    })
            }
        },
        updateCt_bccn: {
            type: Ct_bccnType,
            args: {
                MaCT_BCCN: { type: GraphQLID },
                MaBaoCaoCongNo: { type: new GraphQLNonNull(GraphQLID) },
                MaDaiLy: { type: new GraphQLNonNull(GraphQLID) },
                NoDau: { type: new GraphQLNonNull(GraphQLInt) },
                PhatSinh: { type: new GraphQLNonNull(GraphQLInt) },
                NoCuoi: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                let updateValues = '';
                for (const prop in args) {
                    if (updateValues.length > 0) updateValues += `, `;
                    updateValues += `"${prop}" = '${args[prop]}' `;
                }
                const sql = `UPDATE "Ct_bccn" SET ${updateValues} WHERE id = '${args.id}' RETURNING *;`
                return pool.connect()
                    .then(client => {
                        return client.query(sql)
                            .then(res => {
                                client.release();
                                return res.rows[0];
                            })
                            .catch(err => {
                                client.release();
                                console.log('Error: ', err);
                            })
                    })
            }
        },
        deleteCt_bccn: {
            type: Ct_bccnType,
            args: { MaCT_BCCN: { type: GraphQLID } },
            resolve(parent, args) {
                const sql = `DELETE FROM "Ct_bccn" WHERE id = '${args.id}' RETURNING *;`
                return pool.connect()
                    .then(client => {
                        return client.query(sql)
                            .then(res => {
                                client.release();
                                return res.rows[0];
                            })
                            .catch(err => {
                                client.release();
                                console.log('Error: ', err);
                            })
                    })
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});