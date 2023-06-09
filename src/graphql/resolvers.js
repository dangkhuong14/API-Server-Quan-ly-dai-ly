import pool from "../database/pool.js";
import initModels from "../../models/init-models.js";
import moment from 'moment'
import { Op, Sequelize } from "sequelize";

const { DAILY, CT_BCCN, DVT, LOAIDAILY,
    QUAN, MATHANG, CT_PHIEUXUATHANG,
    PHIEUXUATHANG, BAOCAOCONGNO, BAOCAODOANHSO,
    CT_BCDS, PHIEUNHAPHANG, PHIEUTHUTIEN, PHIEUGHINO
} = initModels

const resolvers = {

    /* ----------------------Custom resolvers------------------------ */

    Daily: {
        NgayTiepNhan: (parent) => {
            // Convert timestamp into string
            const formattedTimestamp = moment(parent.NgayTiepNhan).format('YYYY-MM-DD HH:mm:ss');
            return formattedTimestamp
        },
        relatedQuan: async (parent, _) => {
            const sql = `SELECT * FROM QUAN WHERE MaQuan = '${parent.MaQuan}';`;
            try {
                const res = await pool.query(sql);
                return res[0][0];
            } catch (err) {
                return console.log('Error: ', err);
            }
        },
        relatedLoaidaily: async (parent, _) => {
            const sql = `SELECT * FROM LOAIDAILY WHERE MaLoaiDaiLy = '${parent.MaLoaiDaiLy}';`;
            try {
                const res = await pool.query(sql);
                return res[0][0];
            } catch (err) {
                return console.log('Error: ', err);
            }
        }
    },
    Phieunhaphang: {
        relatedMathang: async (parent, _) => {
            const sql = `SELECT * FROM MATHANG WHERE MaMatHang = '${parent.MaMatHang}';`;
            try {
                const res = await pool.query(sql);
                return res[0][0];
            } catch (err) {
                return console.log('Error: ', err);
            }
        }
    },
    Mathang: {
        relatedDvt: async (parent, _) => {
            const sql = `SELECT * FROM DVT WHERE MaDVT = '${parent.MaDVT}';`;
            try {
                const res = await pool.query(sql);
                return res[0][0];
            } catch (err) {
                return console.log('Error: ', err);
            }
        }
    },
    Phieuxuathang: {
        NgayLapPhieu: (parent) => {
            // Convert timestamp into string
            const formattedTimestamp = moment(parent.NgayLapPhieu).format('YYYY-MM-DD HH:mm:ss');
            return formattedTimestamp
        },
        relatedDaily: async (parent, _) => {
            const sql = `SELECT * FROM DAILY WHERE MaDaiLy = '${parent.MaDaiLy}';`;
            try {
                const res = await pool.query(sql);
                return res[0][0];
            } catch (err) {
                return console.log('Error: ', err);
            }
        }
    },
    Ct_phieuxuathang: {
        relatedPhieuxuathang: async (parent, _) => {
            const sql = `SELECT * FROM PHIEUXUATHANG WHERE MaPhieuXuat = '${parent.MaPhieuXuat}';`;
            try {
                const res = await pool.query(sql);
                return res[0][0];
            } catch (err) {
                return console.log('Error: ', err);
            }
        },
        relatedMathang: async (parent, _) => {
            const sql = `SELECT * FROM MATHANG WHERE MaMatHang = '${parent.MaMatHang}';`;
            try {
                const res = await pool.query(sql);
                return res[0][0];
            } catch (err) {
                return console.log('Error: ', err);
            }
        }
    },
    Baocaodoanhso: {
        Thang: (parent) => {
            const formattedDate = moment(parent.Thang).format('YYYY-MM');
            return formattedDate;
        }
    },
    Ct_bcds: {
        relatedBaocaodoanhso: async (parent, _) => {
            const sql = `SELECT * FROM BAOCAODOANHSO WHERE MaBaoCaoDoanhSo = '${parent.MaBaoCaoDoanhSo}';`;
            try {
                const res = await pool.query(sql);
                return res[0][0];
            } catch (err) {
                return console.log('Error: ', err);
            }
        },
        relatedDaily: async (parent, _) => {
            const sql = `SELECT * FROM DAILY WHERE MaDaiLy = '${parent.MaDaiLy}';`;
            try {
                const res = await pool.query(sql);
                return res[0][0];
            } catch (err) {
                return console.log('Error: ', err);
            }
        }
    },
    Phieuthutien: {
        NgayThuTien: (parent) => {
            // Convert timestamp into string
            const formattedTimestamp = moment(parent.NgayThuTien).format('YYYY-MM-DD HH:mm:ss');
            return formattedTimestamp
        },
        relatedDaily: async (parent, _) => {
            const sql = `SELECT * FROM DAILY WHERE MaDaiLy = '${parent.MaDaiLy}';`;
            try {
                const res = await pool.query(sql);
                return res[0][0];
            } catch (err) {
                return console.log('Error: ', err);
            }
        }
    },
    Baocaocongno: {
        Thang: (parent) => {
            const formattedDate = moment(parent.Thang).format('YYYY-MM');
            return formattedDate;
        }
    },
    Ct_bccn: {
        relatedBaocaocongno: async (parent, _) => {
            const sql = `SELECT * FROM BAOCAOCONGNO WHERE MaBaoCaoCongNo = '${parent.MaBaoCaoCongNo}';`;
            try {
                const res = await pool.query(sql);
                return res[0][0];
            } catch (err) {
                return console.log('Error: ', err);
            }
        },
        relatedDaily: async (parent, _) => {
            const sql = `SELECT * FROM DAILY WHERE MaDaiLy = '${parent.MaDaiLy}';`;
            try {
                const res = await pool.query(sql);
                return res[0][0];
            } catch (err) {
                return console.log('Error: ', err);
            }
        }
    },
    Phieughino: {
        NgayLapPhieu: (parent) => {
            // Convert timestamp into string
            const formattedTimestamp = moment(parent.NgayLapPhieu).format('YYYY-MM-DD HH:mm:ss');
            return formattedTimestamp
        },
        relatedDaily: async (parent, _) => {
            const sql = `SELECT * FROM DAILY WHERE MaDaiLy = '${parent.MaDaiLy}';`;
            try {
                const res = await pool.query(sql);
                return res[0][0];
            } catch (err) {
                return console.log('Error: ', err);
            }
        }
    },

    /* ----------------------Query resolvers------------------------ */

    Query: {
        everyCT_BCCNByMaBCCN: async (_, { MaBaoCaoCongNo }) => {
            try {
                const res = await CT_BCCN.findAll({
                    where: {
                        MaBaoCaoCongNo
                    }
                })
                return res;
            } catch (err) {
                throw new Error(`Không thể tìm được các chi tiết BCCN.`)
            }
        },
        everyCT_BCDSByMaBCDS: async (_, { MaBaoCaoDoanhSo }) => {
            try {
                const res = await CT_BCDS.findAll({
                    where: {
                        MaBaoCaoDoanhSo
                    }
                })
                return res;
            } catch (err) {
                throw new Error(`Không thể tìm được các chi tiết BCDS: ${err}`)
            }
        },
        everyMatHangByArrOfMaMatHang: async (_, { MaMatHangArr }) => {
            try {
                const danhSach = await MATHANG.findAll({
                    where: {
                        MaMatHang: {
                            [Sequelize.Op.in]: MaMatHangArr
                        }
                    }
                });
                return danhSach;
            } catch (error) {
                throw new Error(`Failed to find MATHANG by Array of MaMatHang: ${error}`);
            }
        },
        thamso: async () => {
            const sql = `SELECT * FROM THAMSO;`;
            try {
                const res = await pool.query(sql);
                return res[0][0];
            } catch (err) {
                return console.log('Error: ', err);
            }
        },
        allPXHByThang: async (_, args) => {
            const { Thang } = args;
            try {
                const startDate = moment(Thang, "YYYY-MM").startOf('month').toDate();
                const endDate = moment(Thang, "YYYY-MM").endOf('month').toDate();

                const result = await PHIEUXUATHANG.findAll({
                    where: {
                        NgayLapPhieu: {
                            [Sequelize.Op.between]: [startDate, endDate]
                        }
                    }
                });
                return result
            } catch (error) {
                console.log('Error: ', error);
                throw new Error(`Failed to find Phieuxuathang by Thang: ${error}`);
            }
        },
        ct_bcdsByTenDLAndThang: async (_, args) => {
            const { TenDaiLy, Thang } = args
            const startDate = moment(Thang, "YYYY-MM").startOf('month').toDate();
            const endDate = moment(Thang, "YYYY-MM").endOf('month').toDate();
            const result = await CT_BCDS.findAll({
                include: [
                    {
                        model: DAILY,
                        as: 'MaDaiLy_DAILY',
                        where: { TenDaiLy },
                    },
                    {
                        model: BAOCAODOANHSO,
                        as: 'MaBaoCaoDoanhSo_BAOCAODOANHSO',
                        where: { Thang: { [Op.between]: [startDate, endDate] } },
                    },
                ],
            });
            return result
        },
        ct_bccnByTenDLAndThang: async (_, args) => {
            const { TenDaiLy, Thang } = args
            const result = await CT_BCCN.findAll({
                include: [
                    {
                        model: DAILY,
                        as: 'MaDaiLy_DAILY',
                        where: { TenDaiLy },
                    },
                    {
                        model: BAOCAOCONGNO,
                        as: 'MaBaoCaoCongNo_BAOCAOCONGNO',
                        where: { Thang },
                    },
                ],
            });
            return result
        },
        everyDaily: async () => {
            try {
                const res = await DAILY.findAll()
                return res
            } catch (err) {
                return console.log('Error: ', err);
            }
        },
        daily: async (_, args) => {
            const { MaDaiLy } = args;

            try {
                const daily = await DAILY.findOne({ where: { MaDaiLy } });

                if (daily) {
                    return daily;
                } else {
                    return null;
                }
            } catch (error) {
                console.log('Error: ', error);
                throw new Error(`Failed to find DAILY by MaDaiLy: ${error}`);
            }
        },
        everyQuan: async () => {
            const sql = `SELECT * FROM QUAN;`;
            try {
                const res = await pool.query(sql);
                return res[0];
            } catch (err) {
                return console.log('Error: ', err);
            }
        },
        quan: async (_, args) => {
            const { MaQuan } = args;

            try {
                const quan = await QUAN.findOne({ where: { MaQuan } });

                if (quan) {
                    return quan;
                } else {
                    return null;
                }
            } catch (error) {
                console.log('Error: ', error);
                throw new Error('Failed to find QUAN by MaQuan');
            }
        },
        everyLoaidaily: async () => {
            const sql = `SELECT * FROM LOAIDAILY;`;
            try {
                const res = await pool.query(sql);
                return res[0];
            } catch (err) {
                return console.log('Error: ', err);
            }
        },
        loaidaily: async (_, args) => {
            const { MaLoaiDaiLy } = args;

            try {
                const loaidaily = await LOAIDAILY.findOne({ where: { MaLoaiDaiLy } });

                if (loaidaily) {
                    return loaidaily;
                } else {
                    return null;
                }
            } catch (error) {
                console.log('Error: ', error);
                throw new Error('Failed to find LOAIDAILY by MaLoaiDaiLy');
            }
        },
        everyDvt: async () => {
            const sql = `SELECT * FROM DVT;`;
            try {
                const res = await pool.query(sql);
                return res[0];
            } catch (err) {
                return console.log('Error: ', err);
            }
        },
        dvt: async (_, args) => {
            const { MaDVT } = args;

            try {
                const dvt = await DVT.findOne({ where: { MaDVT } });

                if (dvt) {
                    return dvt;
                } else {
                    return null;
                }
            } catch (error) {
                console.log('Error: ', error);
                throw new Error('Failed to find DVT by MaDVT');
            }
        },
        everyPhieunhaphang: async () => {
            const sql = `SELECT * FROM PHIEUNHAPHANG;`;
            try {
                const res = await pool.query(sql);
                return res[0];
            } catch (err) {
                return console.log('Error: ', err);
            }
        },
        phieunhaphang: async (_, args) => {
            const { MaPhieuNhap } = args;

            try {
                const phieunhaphang = await PHIEUNHAPHANG.findOne({ where: { MaPhieuNhap } });

                if (phieunhaphang) {
                    return phieunhaphang;
                } else {
                    return null;
                }
            } catch (error) {
                console.log('Error: ', error);
                throw new Error('Failed to find PHIEUNHAPHANG by MaPhieuNhap');
            }
        },
        everyMathang: async () => {
            const sql = `SELECT * FROM MATHANG;`;
            try {
                const res = await pool.query(sql);
                return res[0];
            } catch (err) {
                return console.log('Error: ', err);
            }
        },
        mathang: async (_, args) => {
            const { MaMatHang } = args;

            try {
                const mathang = await MATHANG.findOne({ where: { MaMatHang } });

                if (mathang) {
                    return mathang;
                } else {
                    return null;
                }
            } catch (error) {
                console.log('Error: ', error);
                throw new Error('Failed to find MATHANG by MaMatHang');
            }
        },
        everyPhieuxuathang: async () => {
            try {
                const res = await PHIEUXUATHANG.findAll()
                return res
            } catch (err) {
                return console.log('Error: ', err);
            }
        },
        phieuxuathang: async (_, args) => {
            const { MaPhieuXuat } = args;

            try {
                const phieuxuathang = await PHIEUXUATHANG.findOne({ where: { MaPhieuXuat } });

                if (phieuxuathang) {
                    return phieuxuathang;
                } else {
                    return null;
                }
            } catch (error) {
                console.log('Error: ', error);
                throw new Error('Failed to find PHIEUXUATHANG by MaPhieuXuat');
            }
        },
        everyCt_phieuxuathang: async () => {
            const sql = `SELECT * FROM CT_PHIEUXUATHANG;`;
            try {
                const res = await pool.query(sql);
                return res[0];
            } catch (err) {
                return console.log('Error: ', err);
            }
        },
        ct_phieuxuathang: async (_, args) => {
            const { MaCT_PXH } = args;

            try {
                const ct_pxh = await CT_PHIEUXUATHANG.findOne({ where: { MaCT_PXH } });

                if (ct_pxh) {
                    return ct_pxh;
                } else {
                    return null;
                }
            } catch (error) {
                console.log('Error: ', error);
                throw new Error('Failed to find CT_PHIEUXUATHANG by MaCT_PXH');
            }
        },
        everyBaocaodoanhso: async () => {
            const sql = `SELECT * FROM BAOCAODOANHSO;`;
            try {
                const res = await pool.query(sql);
                return res[0];
            } catch (err) {
                return console.log('Error: ', err);
            }
        },
        baocaodoanhso: async (_, args) => {
            const { MaBaoCaoDoanhSo } = args;

            try {
                const baocaodoanhso = await BAOCAODOANHSO.findOne({ where: { MaBaoCaoDoanhSo } });

                if (baocaodoanhso) {
                    return baocaodoanhso;
                } else {
                    return null;
                }
            } catch (error) {
                console.log('Error: ', error);
                throw new Error('Failed to find BAOCAODOANHSO by MaBaoCaoDoanhSo');
            }
        },
        everyCt_bcds: async () => {
            const sql = `SELECT * FROM CT_BCDS;`;
            try {
                const res = await pool.query(sql);
                return res[0];
            } catch (err) {
                return console.log('Error: ', err);
            }
        },
        ct_bcds: async (_, args) => {
            const { MaCT_BCDS } = args;

            try {
                const ct_bcds = await CT_BCDS.findOne({ where: { MaCT_BCDS } });

                if (ct_bcds) {
                    return ct_bcds;
                } else {
                    return null;
                }
            } catch (error) {
                console.log('Error: ', error);
                throw new Error('Failed to find CT_BCDS by MaCT_BCDS');
            }
        },
        everyPhieuthutien: async () => {
            const sql = `SELECT * FROM PHIEUTHUTIEN;`;
            try {
                const res = await pool.query(sql);
                return res[0];
            } catch (err) {
                return console.log('Error: ', err);
            }
        },
        phieuthutien: async (_, args) => {
            const { MaPhieuThuTien } = args;

            try {
                const phieuthutien = await PHIEUTHUTIEN.findOne({ where: { MaPhieuThuTien } });

                if (phieuthutien) {
                    return phieuthutien;
                } else {
                    return null;
                }
            } catch (error) {
                console.log('Error: ', error);
                throw new Error('Failed to find PHIEUTHUTIEN by MaPhieuThuTien');
            }
        },
        everyBaocaocongno: async () => {
            const sql = `SELECT * FROM BAOCAOCONGNO;`;
            try {
                const res = await pool.query(sql);
                return res[0];
            } catch (err) {
                return console.log('Error: ', err);
            }
        },
        baocaocongno: async (_, args) => {
            const { MaBaoCaoCongNo } = args;

            try {
                const baocaocongno = await BAOCAOCONGNO.findOne({ where: { MaBaoCaoCongNo } });

                if (baocaocongno) {
                    return baocaocongno;
                } else {
                    return null;
                }
            } catch (error) {
                console.log('Error: ', error);
                throw new Error('Failed to find BAOCAOCONGNO by MaBaoCaoCongNo');
            }
        },
        everyCt_bccn: async () => {
            const sql = `SELECT * FROM CT_BCCN;`;
            try {
                const res = await pool.query(sql);
                return res[0];
            } catch (err) {
                return console.log('Error: ', err);
            }
        },
        ct_bccn: async (_, args) => {
            const { MaCT_BCCN } = args;

            try {
                const ct_bccn = await CT_BCCN.findOne({ where: { MaCT_BCCN } });

                if (ct_bccn) {
                    return ct_bccn;
                } else {
                    return null;
                }
            } catch (error) {
                console.log('Error: ', error);
                throw new Error('Failed to find CT_BCCN by MaCT_BCCN');
            }
        },
    },

    /* ----------------------Mutation resolvers------------------------ */

    Mutation: {
        addPhieughino: async (_, args) => {
            const { NgayLapPhieu } = args;
            let newPhieuGhiNo

            // Chuyển đổi giá trị timestamp từ dạng string sang dạng timestamp
            const convertedTimestamp = moment(NgayLapPhieu).toDate();

            try {
                if (NgayLapPhieu) {
                    newPhieuGhiNo = await PHIEUGHINO.create({ NgayLapPhieu: convertedTimestamp, ...args });
                    return newPhieuGhiNo;
                } else {
                    newPhieuGhiNo = await PHIEUGHINO.create(args);
                    return newPhieuGhiNo;
                }

            } catch (error) {
                console.log('Error: ', error);
                throw new Error(`Không thể thêm phiếu ghi nợ mới.`)
            }
        },
        accumulateTienNo: async (_, { MaDaiLy, TienNo }) => {
            if (TienNo < 0) throw new Error('Tiền nợ không được bé hơn 0.')
            try {
                const daily = await DAILY.findByPk(MaDaiLy)
                if (!daily) throw new Error('Không tìm thấy đại lý!')

                const loaidaily = await LOAIDAILY.findByPk(daily.dataValues.MaLoaiDaiLy)
                if (!loaidaily) throw new Error('Không tìm thấy loại đại lý')

                if ((daily.dataValues.TienNo + TienNo) > loaidaily.dataValues.SoNoToiDa) throw new Error('Không thể ghi thêm nợ cho đại lý này vì tiền nợ sẽ vượt quá tiền nợ tối đa của loại đại lý.')
                // Kiểm tra nếu phía client cung cấp giá trị cho NgayLapPhieu

                if (TienNo === 0) return daily

                // Ghi nhận việc đại lý bị nợ vào phiếu ghi nợ
                const newPhieuGhiNo = PHIEUGHINO.create({ MaDaiLy, SoTienNo: TienNo })
                if (!newPhieuGhiNo) throw new Error('Không thể tạo được phiếu ghi nợ!')

                // Tăng tiền nợ của đại lý
                const tienNoMoi = daily.TienNo + TienNo;
                await DAILY.update(
                    { TienNo: tienNoMoi },
                    { where: { MaDaiLy } }
                )
                const dailyafterupdate = DAILY.findByPk(MaDaiLy)
                return dailyafterupdate
            } catch (err) {
                throw new Error(`Không thể cập nhật tiền nợ cho đại lý vì: ${err}`)
            }
        },
        calculateTyLe: async (_, { MaBaoCaoDoanhSo }) => {
            try {
                const ct_bcdsArr = await CT_BCDS.findAll({
                    where: {
                        MaBaoCaoDoanhSo
                    }
                })
                if (ct_bcdsArr.length === 0) {
                    throw new Error('Không có bất kỳ bản ghi CT_BCDS nào.')
                }
                const totalTongTriGia = ct_bcdsArr.reduce((sum, ct_bcds) => sum + ct_bcds.dataValues.TongTriGia, 0);

                if (totalTongTriGia === 0) {
                    throw new Error("Tất cả phiếu xuất hàng đều có tổng trị giá bằng 0. Không cần thực hiện thao tác tính toán tỷ lệ!");
                }

                for (const ct_bcds of ct_bcdsArr) {
                    let TyLe = (ct_bcds.dataValues.TongTriGia / totalTongTriGia) * 100;
                    try {
                        await CT_BCDS.update(
                            { TyLe },
                            { where: { MaCT_BCDS: ct_bcds.dataValues.MaCT_BCDS } })
                    } catch (err) {
                        throw new Error(`Không thể cập nhật CT_BCDS: ${err}`);
                    }
                };
                return 'Tính toán tỷ lệ của tất cả các CT_BCDS có cùng mã báo cáo doanh số thành công!';

            } catch (err) {
                throw new Error(`Không thể tính toán tỷ lệ cho các CT_BCDS: ${err}`);
            }
        },
        updateThamso: async (_, args) => {
            try {
                const { SoLuongLoaiDaiLy, SoDaiLyToiDaTrongQuan, SoLuongMatHang, SoLuongDVT,
                    SoTienThuKhongVuotQuaSoTienDaiLyDangNo, TyLeDonGiaXuat } = args;

                if ((SoLuongLoaiDaiLy || SoDaiLyToiDaTrongQuan || SoLuongMatHang || SoLuongDVT || TyLeDonGiaXuat) <= 0)
                    throw new Error(`Tham số này không được bé hơn hoặc bằng 0`)

                if (SoTienThuKhongVuotQuaSoTienDaiLyDangNo !== 0 && SoTienThuKhongVuotQuaSoTienDaiLyDangNo !== 1) {
                    throw new Error('Số tiền thu không được vượt quá số tiền đại lý đang nợ chỉ có thể nhận giá trị 0 hoặc 1. Chọn 0 để tắt điều kiện này, chọn 1 để bật.');
                }

                let updateQuery = 'UPDATE THAMSO SET ';
                const updateFields = [];

                if (SoLuongLoaiDaiLy !== undefined) {
                    updateFields.push(`SoLuongLoaiDaiLy = ${SoLuongLoaiDaiLy}`);
                }
                if (SoDaiLyToiDaTrongQuan !== undefined) {
                    updateFields.push(`SoDaiLyToiDaTrongQuan = ${SoDaiLyToiDaTrongQuan}`);
                }
                if (SoLuongMatHang !== undefined) {
                    updateFields.push(`SoLuongMatHang = ${SoLuongMatHang}`);
                }
                if (SoLuongDVT !== undefined) {
                    updateFields.push(`SoLuongDVT = ${SoLuongDVT}`);
                }
                if (SoTienThuKhongVuotQuaSoTienDaiLyDangNo !== undefined) {
                    updateFields.push(`SoTienThuKhongVuotQuaSoTienDaiLyDangNo = ${SoTienThuKhongVuotQuaSoTienDaiLyDangNo}`);
                }
                if (TyLeDonGiaXuat !== undefined) {
                    updateFields.push(`TyLeDonGiaXuat = ${TyLeDonGiaXuat}`);
                }

                if (updateFields.length === 0) {
                    throw new Error('Không có tham số nào để cập nhật.');
                }

                updateQuery += updateFields.join(', ');
                await pool.query(updateQuery)
                const res = await pool.query('SELECT * FROM THAMSO')
                return res[0][0]
            } catch (e) {
                throw new Error(`Không cập nhật tham số được vì: ${e.message}`)
            }
        },
        addDaily: async (_, args) => {
            const { NgayTiepNhan, MaQuan } = args;
            let newDaiLy

            // Chuyển đổi giá trị timestamp từ dạng string sang dạng timestamp
            const convertedTimestamp = moment(NgayTiepNhan).toDate();

            try {
                const sql = `SELECT * FROM THAMSO;`;
                const res = await pool.query(sql);
                // Kiem tra tham so
                const soDLToiDaTrongQuan = res[0][0].SoDaiLyToiDaTrongQuan;
                const daiLyArr = await DAILY.findAll({ where: { MaQuan } })
                if (daiLyArr.length >= soDLToiDaTrongQuan) throw new Error(`Số lượng đại lý có trong một quận đã đạt mức tối đa là ${soDLToiDaTrongQuan} đại lý mỗi quận!`)
                // Kiểm tra nếu phía client cung cấp giá trị cho NgayTiepNhan
                if (NgayTiepNhan) {
                    newDaiLy = await DAILY.create({ NgayTiepNhan: convertedTimestamp, ...args });
                    return newDaiLy;
                } else {
                    newDaiLy = await DAILY.create(args);
                    return newDaiLy;
                }

            } catch (error) {
                console.log('Error: ', error);
                throw new Error(`Không thể thêm đại lý mới vì: ${error}`)
            }

        },
        updateDaily: async (_, args) => {
            const { MaDaiLy, ...rest } = args;

            try {
                const result = await DAILY.update(
                    rest,
                    { where: { MaDaiLy } }
                );

                return result[0] > 0 ? { MaDaiLy, ...rest } : null;
            } catch (error) {
                console.log('Error: ', error);
                throw new Error('Failed to update DAILY');
            }
        },
        deleteDaily: async (_, args) => {
            const { MaDaiLy } = args;
            try {
                const daily = await DAILY.findByPk(MaDaiLy);
                if (!daily) {
                    throw new Error('DAILY not found');
                }
                await daily.destroy();
                return daily;
            } catch (error) {
                console.log('Error: ', error);
                throw new Error(`Failed to delete DAILY: ${error}`);
            }
        },
        addBaocaocongno: async (_, { Thang }) => {
            const parsedDate = moment(Thang, 'YYYY-MM-DD').toDate();
            try {
                const newLoaidaily = await BAOCAOCONGNO.create({ Thang: parsedDate });
                return newLoaidaily;
            } catch (error) {
                console.log('Error: ', error);
                throw new Error(`Không thể thêm báo cáo công nợ mới.`);
            }
        },
        updateBaocaocongno: async (_, args) => {
            const { MaBaoCaoCongNo, ...rest } = args;

            try {
                const result = await BAOCAOCONGNO.update(
                    rest,
                    { where: { MaBaoCaoCongNo } }
                );

                return result[0] > 0 ? { MaBaoCaoCongNo, ...rest } : null;
            } catch (error) {
                console.log('Error: ', error);
                throw new Error('Failed to update BAOCAOCONGNO');
            }
        },
        deleteBaocaocongno: async (_, args) => {
            const { MaBaoCaoCongNo } = args;
            try {
                const baocaocongno = await BAOCAOCONGNO.findByPk(MaBaoCaoCongNo);
                if (!baocaocongno) {
                    throw new Error('BAOCAOCONGNO not found');
                }
                await baocaocongno.destroy();
                return baocaocongno;
            } catch (error) {
                console.log('Error: ', error);
                throw new Error(`Failed to delete BAOCAOCONGNO: ${error}`);
            }
        },
        addCt_bccn: async (_, args) => {
            const { MaBaoCaoCongNo, MaDaiLy } = args;
            try {

                // Lay ra bao cao cong no co Id la MaBaoCaoCongNo de lay duoc Thang
                const baocaocongno = await BAOCAOCONGNO.findOne({ where: { MaBaoCaoCongNo } });

                if (!baocaocongno) {
                    throw new Error(`Không thể tìm thấy được báo cáo doanh số với mã báo cáo doanh số bạn cung cấp.`);
                }

                const startDate = moment(baocaocongno.dataValues.Thang).startOf('month').toDate();
                const endDate = moment(baocaocongno.dataValues.Thang).endOf('month').toDate();

                const startDateOfPrevMonth = moment(baocaocongno.dataValues.Thang).subtract(1, 'months').startOf('month').toDate();
                const endDateOfPrevMonth = moment(baocaocongno.dataValues.Thang).subtract(1, 'months').endOf('month').toDate();


                // Xu ly logic tinh toan NoDau, PhatSinh, NoCuoi:
                let noDau = 0;
                let phatSinh = 0;
                let noCuoi = 0;
                let noDuocTra = 0
                // Lay ra tat ca PHIEUTHUTIEN, PHIEUGHINO co Thang nam trong baocaocongno.Thang, MaDaiLy = MaDaiLy

                // Lay ra CT_BCCN gan voi cuoi thang nhat cua dai ly trong thang truoc do
                // de lay du lieu no cuoi lam no dau cho ct_bccn moi
                const prevCT_BCCN = await CT_BCCN.findOne({
                    where: {
                        MaDaiLy,
                    },
                    include: [
                        {
                            model: BAOCAOCONGNO,
                            as: 'MaBaoCaoCongNo_BAOCAOCONGNO',
                            where: {
                                Thang: {
                                    [Op.between]: [startDateOfPrevMonth, endDateOfPrevMonth]
                                }
                            }
                        }
                    ],
                    order: [[{ model: BAOCAOCONGNO, as: 'MaBaoCaoCongNo_BAOCAOCONGNO' }, 'Thang', 'DESC']],
                    limit: 1
                });

                // Nợ đầu của thàng này là nợ cuối của tháng trước
                if (prevCT_BCCN) {
                    noDau = prevCT_BCCN.dataValues.NoCuoi;
                }

                // const phieuThuTienArr = await PHIEUTHUTIEN.findAll({
                //     where: {
                //         MaDaiLy,
                //         NgayThuTien: { [Op.between]: [startDate, endDate] },
                //     },
                // });

                // const phieuGhiNoArr = await PHIEUGHINO.findAll({
                //     where: {
                //         MaDaiLy,
                //         NgayLapPhieu: { [Op.between]: [startDate, endDate] },
                //     },
                // });

                const phieuThuTienSum = await PHIEUTHUTIEN.sum('SoTienThu', {
                    where: {
                        MaDaiLy,
                        NgayThuTien: { [Op.between]: [startDate, endDate] },
                    },
                });

                const phieuGhiNoSum = await PHIEUGHINO.sum('SoTienNo', {
                    where: {
                        MaDaiLy,
                        NgayLapPhieu: { [Op.between]: [startDate, endDate] },
                    },
                });

                if (phieuGhiNoSum) {
                    phatSinh = phieuGhiNoSum;
                }

                if (phieuThuTienSum) {
                    noDuocTra = phieuThuTienSum;
                }

                //Tính phát sinh là tổng các thuộc tính SoTienNo của tất cả phiếu ghi nợ của đại lý trong tháng này.
                // if (phieuGhiNoArr.length > 0)
                //     phatSinh = phieuGhiNoArr.reduce((sum, phieuGhiNo) => sum + phieuGhiNo.dataValues.SoTienNo, 0)

                // if (phieuThuTienArr.length > 0)
                //     noDuocTra = phieuThuTienArr.reduce((sum, phieuThuTien) => sum + phieuThuTien.dataValues.SoTienThu, 0)

                // Tính nợ cuố: Nợ đầu + phát sinh - tổng số tiền mà đại lý trả được(Tổng giá trị của phiếu thu tiền của các đại lý trong tháng)
                noCuoi = noDau + phatSinh - noDuocTra;

                const newCT_BCCN = await CT_BCCN.create({ NoDau: noDau, PhatSinh: phatSinh, NoCuoi: noCuoi, ...args });
                return newCT_BCCN;
            } catch (error) {
                console.log('Error: ', error);
                throw new Error('Không thể thêm chi tiết báo cáo công nợ mới.')
            }
        },
        updateCt_bccn: async (_, args) => {
            const { MaCT_BCCN, ...rest } = args;

            try {
                const result = await CT_BCCN.update(
                    rest,
                    { where: { MaCT_BCCN } }
                );

                return result[0] > 0 ? { MaCT_BCCN, ...rest } : null;
            } catch (error) {
                console.log('Error: ', error);
                throw new Error('Failed to update CT_BCCN');
            }
        },
        deleteCt_bccn: async (_, args) => {
            const { MaCT_BCCN } = args;
            try {
                const ct_bccn = await CT_BCCN.findByPk(MaCT_BCCN);
                if (!ct_bccn) {
                    throw new Error('CT_BCCN not found');
                }
                await ct_bccn.destroy();
                return ct_bccn;
            } catch (error) {
                console.log('Error: ', error);
                throw new Error(`Failed to delete CT_BCCN: ${error}`);
            }
        },
        addQuan: async (_, args) => {
            try {
                const newQuan = await QUAN.create(args);
                return newQuan;
            } catch (error) {
                console.log('Error: ', error);
                throw new Error('Failed to add QUAN')
            }
        },
        updateQuan: async (_, args) => {
            const { MaQuan, ...rest } = args;

            try {
                const result = await QUAN.update(
                    rest,
                    { where: { MaQuan } }
                );

                return result[0] > 0 ? { MaQuan, ...rest } : null;
            } catch (error) {
                console.log('Error: ', error);
                throw new Error('Failed to update QUAN');
            }
        },
        deleteQuan: async (_, args) => {
            const { MaQuan } = args;
            try {
                const quan = await QUAN.findByPk(MaQuan);
                if (!quan) {
                    throw new Error('QUAN not found');
                }
                await quan.destroy();
                return quan;
            } catch (error) {
                console.log('Error: ', error);
                throw new Error(`Failed to delete QUAN: ${error}`);
            }
        },
        addLoaidaily: async (_, args) => {
            try {
                const newLoaidaily = await LOAIDAILY.create(args);
                return newLoaidaily;
            } catch (error) {
                console.log('Error: ', error);
                throw new Error('Failed to add LOAIDAILY');
            }
        },
        updateLoaidaily: async (_, args) => {
            const { MaLoaiDaiLy, ...rest } = args;

            try {
                const result = await LOAIDAILY.update(
                    rest,
                    { where: { MaLoaiDaiLy } }
                );

                return result[0] > 0 ? { MaLoaiDaiLy, ...rest } : null;
            } catch (error) {
                console.log('Error: ', error);
                throw new Error('Failed to update LOAIDAILY');
            }
        },
        deleteLoaidaily: async (_, args) => {
            const { MaLoaiDaiLy } = args;
            try {
                const loaidaily = await LOAIDAILY.findByPk(MaLoaiDaiLy);
                if (!loaidaily) {
                    throw new Error('LOAIDAILY not found');
                }
                await loaidaily.destroy();
                return loaidaily;
            } catch (error) {
                console.log('Error: ', error);
                throw new Error(`Failed to delete LOAIDAILY: ${error}`);
            }
        },
        addDvt: async (_, args) => {
            try {
                const newDVT = await DVT.create(args);
                return newDVT;
            } catch (error) {
                console.log('Error: ', error);
                throw new Error('Failed to add DVT')
            }
        },
        updateDvt: async (_, args) => {
            const { MaDVT, ...rest } = args;

            try {
                const result = await DVT.update(
                    rest,
                    { where: { MaDVT } }
                );

                return result[0] > 0 ? { MaDVT, ...rest } : null;
            } catch (error) {
                console.log('Error: ', error);
                throw new Error('Failed to update DVT');
            }
        },
        deleteDvt: async (_, args) => {
            const { MaDVT } = args;
            try {
                const dvt = await DVT.findByPk(MaDVT);
                if (!dvt) {
                    throw new Error('DVT not found');
                }
                await dvt.destroy();
                return dvt;
            } catch (error) {
                console.log('Error: ', error);
                throw new Error(`Failed to delete DVT: ${error}`);
            }
        },
        addPhieunhaphang: async (_, args) => {
            const { MaMatHang, SoLuong } = args
            try {
                if (SoLuong <= 0) throw new Error('Không thể lập phiếu nhập hàng với số lượng nhập vào bé hơn hoặc bằng 0')
                // Thay doi so luong voi mat hang tuong ung
                const mathang = await MATHANG.findByPk(MaMatHang)
                if (!mathang) throw new Error(`Không thể tìm thấy mặt hàng!`)
                const newSoLuong = mathang.dataValues.SoLuongTon + SoLuong;

                await MATHANG.update(
                    { SoLuongTon: newSoLuong },
                    { where: { MaMatHang } }
                )

                const newPhieunhaphang = await PHIEUNHAPHANG.create(args);
                return newPhieunhaphang;
            } catch (error) {
                console.log('Error: ', error);
                throw new Error(`Không thể thêm phiếu nhập hàng mới vì: ${error}`)
            }
        },
        updatePhieunhaphang: async (_, args) => {
            const { MaPhieuNhap, ...rest } = args;

            try {
                const result = await PHIEUNHAPHANG.update(
                    rest,
                    { where: { MaPhieuNhap } }
                );

                return result[0] > 0 ? { MaPhieuNhap, ...rest } : null;
            } catch (error) {
                console.log('Error: ', error);
                throw new Error('Failed to update PHIEUNHAPHANG');
            }
        },
        deletePhieunhaphang: async (_, args) => {
            const { MaPhieuNhap } = args;
            try {
                const phieunhaphang = await PHIEUNHAPHANG.findByPk(MaPhieuNhap);
                if (!phieunhaphang) {
                    throw new Error('PHIEUNHAPHANG not found');
                }
                await phieunhaphang.destroy();
                return phieunhaphang;
            } catch (error) {
                console.log('Error: ', error);
                throw new Error(`Failed to delete PHIEUNHAPHANG: ${error}`);
            }
        },
        addMathang: async (_, args) => {
            try {
                const newMathang = await MATHANG.create(args);
                return newMathang;
            } catch (error) {
                console.log('Error: ', error);
                throw new Error('Failed to add MATHANG')
            }
        },
        updateMathang: async (_, args) => {
            const { MaMatHang, ...rest } = args;

            try {
                const result = await MATHANG.update(
                    rest,
                    { where: { MaMatHang } }
                );

                return result[0] > 0 ? { MaMatHang, ...rest } : null;
            } catch (error) {
                console.log('Error: ', error);
                throw new Error('Failed to update MATHANG');
            }
        },
        deleteMathang: async (_, args) => {
            const { MaMatHang } = args;
            try {
                const mathang = await MATHANG.findByPk(MaMatHang);
                if (!mathang) {
                    throw new Error('MATHANG not found');
                }
                await mathang.destroy();
                return mathang;
            } catch (error) {
                console.log('Error: ', error);
                throw new Error(`Failed to delete MATHANG: ${error}`);
            }
        },
        addPhieuxuathang: async (_, args) => {
            const { NgayLapPhieu } = args;

            try {
                // Chuyển đổi giá trị timestamp từ dạng string sang dạng timestamp
                const convertedTimestamp = NgayLapPhieu ? moment(NgayLapPhieu).toDate() : undefined;

                const newPhieuXuatHang = await PHIEUXUATHANG.create({ NgayLapPhieu: convertedTimestamp, ...args });
                return newPhieuXuatHang;

            } catch (error) {
                console.log('Error: ', error);
                throw new Error(`Không thể tạo phiếu xuất hàng mới!`)
            }
        },
        updatePhieuxuathang: async (_, args) => {
            const { MaPhieuXuat, ...rest } = args;

            try {
                const result = await PHIEUXUATHANG.update(
                    rest,
                    { where: { MaPhieuXuat } }
                );

                return result[0] > 0 ? { MaPhieuXuat, ...rest } : null;
            } catch (error) {
                console.log('Error: ', error);
                throw new Error('Failed to update PHIEUXUATHANG');
            }
        },
        deletePhieuxuathang: async (_, args) => {
            const { MaPhieuXuat } = args;
            try {
                const phieuxuathang = await PHIEUXUATHANG.findByPk(MaPhieuXuat);
                if (!phieuxuathang) {
                    throw new Error('PHIEUXUATHANG not found');
                }
                await phieuxuathang.destroy();
                return phieuxuathang;
            } catch (error) {
                console.log('Error: ', error);
                throw new Error(`Failed to delete PHIEUXUATHANG: ${error}`);
            }
        },
        addCt_phieuxuathang: async (_, args) => {
            const { MaMatHang, SoLuongXuat } = args
            try {
                if (SoLuong <= 0) throw new Error('Không thể lập chi tiết phiếu xuất hàng với số lượng xuất bằng hoặc bé hơn 0.')
                // Thay doi so luong voi mat hang tuong ung
                const mathang = await MATHANG.findByPk(MaMatHang)
                if (!mathang) throw new Error(`Không thể tìm thấy mặt hàng!`)
                // Kiem tra so luong ton cua mat hang sau khi xuat co be hon 0 hay khong
                const soLuongTonSauXuat = mathang.dataValues.SoLuongTon - SoLuongXuat;
                if (soLuongTonSauXuat < 0) throw new Error(`Số lượng hàng được xuất phải nhỏ hơn hoặc bằng số lượng hàng tồn kho của mặt hàng`)

                await MATHANG.update(
                    { SoLuongTon: soLuongTonSauXuat },
                    { where: { MaMatHang } }
                )

                const newCt_phieuxuathang = await CT_PHIEUXUATHANG.create(args);
                return newCt_phieuxuathang;
            } catch (error) {
                console.log('Error: ', error);
                throw new Error(`Không thể thêm chi tiết phiếu xuất hàng mới vì: ${error}`)
            }
        },
        updateCt_phieuxuathang: async (_, args) => {
            const { MaCT_PXH, ...rest } = args;

            try {
                const result = await CT_PHIEUXUATHANG.update(
                    rest,
                    { where: { MaCT_PXH } }
                );

                return result[0] > 0 ? { MaCT_PXH, ...rest } : null;
            } catch (error) {
                console.log('Error: ', error);
                throw new Error('Failed to update CT_PHIEUXUATHANG');
            }
        },
        deleteCt_phieuxuathang: async (_, args) => {
            const { MaCT_PXH } = args;
            try {
                const ct_phieuxuathang = await CT_PHIEUXUATHANG.findByPk(MaCT_PXH);
                if (!ct_phieuxuathang) {
                    throw new Error('CT_PHIEUXUATHANG not found');
                }
                await ct_phieuxuathang.destroy();
                return ct_phieuxuathang;
            } catch (error) {
                console.log('Error: ', error);
                throw new Error(`Failed to delete CT_PHIEUXUATHANG: ${error}`);
            }
        },
        addBaocaodoanhso: async (parent, args) => {
            const parsedDate = moment(args.Thang, 'YYYY-MM-DD').toDate();
            try {
                const newBaocaodoanhso = await BAOCAODOANHSO.create({ Thang: parsedDate });
                return newBaocaodoanhso;
            } catch (error) {
                console.log('Error: ', error);
                throw new Error(`Không thể thêm báo cáo doanh số mới`);
            }
        },
        updateBaocaodoanhso: async (_, args) => {
            const { MaBaoCaoDoanhSo, ...rest } = args;

            try {
                const result = await BAOCAODOANHSO.update(
                    rest,
                    { where: { MaBaoCaoDoanhSo } }
                );

                return result[0] > 0 ? { MaBaoCaoDoanhSo, ...rest } : null;
            } catch (error) {
                console.log('Error: ', error);
                throw new Error('Failed to update BAOCAODOANHSO');
            }
        },
        deleteBaocaodoanhso: async (_, args) => {
            const { MaBaoCaoDoanhSo } = args;
            try {
                const baocaodoanhso = await BAOCAODOANHSO.findByPk(MaBaoCaoDoanhSo);
                if (!baocaodoanhso) {
                    throw new Error('BAOCAODOANHSO not found');
                }
                await baocaodoanhso.destroy();
                return baocaodoanhso;
            } catch (error) {
                console.log('Error: ', error);
                throw new Error(`Failed to delete BAOCAODOANHSO: ${error}`);
            }
        },
        addCt_bcds: async (_, args) => {
            const { MaBaoCaoDoanhSo, MaDaiLy } = args;

            try {
                // Lay ra bao cao doanh so co Id la MaBaoCaoDoanhSo de lay duoc Thang
                const baocaodoanhso = await BAOCAODOANHSO.findOne({ where: { MaBaoCaoDoanhSo } });

                if (!baocaodoanhso) {
                    throw new Error(`Không thể tìm thấy được báo cáo doanh số với mã báo cáo doanh số bạn cung cấp.`);
                }

                const startDate = moment(baocaodoanhso.dataValues.Thang).startOf('month').toDate();
                const endDate = moment(baocaodoanhso.dataValues.Thang).endOf('month').toDate();

                // Xu ly logic tinh toan TyLe, SoPhieuXuat, TongTriGia:
                // Lay ra tat ca PhieuXuatHang co Thang nam trong baocaodoanhso.Thang, MaDaiLy = MaDaiLy
                const res = await PHIEUXUATHANG.findAll({
                    where: {
                        MaDaiLy,
                        NgayLapPhieu: { [Op.between]: [startDate, endDate] },
                    },
                });

                let tyle = 0;
                let sophieuxuat = 0;
                let tongtien = 0;

                if (res.length > 0) {
                    for (const pxh of res) {
                        tongtien += pxh.dataValues.TongTien;
                        sophieuxuat++;
                    }
                }

                const ct_bcds = await CT_BCDS.create({
                    TyLe: tyle,
                    SoPhieuXuat: sophieuxuat,
                    TongTriGia: tongtien,
                    ...args,
                });

                return ct_bcds;
            } catch (error) {
                console.log('Error:', error);
                throw new Error(`Không thể thêm chi tiết báo cáo doanh số mới vào cơ sở dữ liệu: ${error.message}`);
            }
        },
        updateCt_bcds: async (_, args) => {
            const { MaCT_BCDS, ...rest } = args;

            try {
                const result = await CT_BCDS.update(
                    rest,
                    { where: { MaCT_BCDS } }
                );

                return result[0] > 0 ? { MaCT_BCDS, ...rest } : null;
            } catch (error) {
                console.log('Error: ', error);
                throw new Error('Failed to update CT_BCDS');
            }
        },
        deleteCt_bcds: async (_, args) => {
            const { MaCT_BCDS } = args;
            try {
                const ct_bcds = await CT_BCDS.findByPk(MaCT_BCDS);
                if (!ct_bcds) {
                    throw new Error('CT_BCDS not found');
                }
                await ct_bcds.destroy();
                return ct_bcds;
            } catch (error) {
                console.log('Error: ', error);
                throw new Error(`Failed to delete CT_BCDS: ${error}`);
            }
        },
        addPhieuthutien: async (_, args) => {
            const { NgayThuTien, SoTienThu } = args;
            let newPhieuThuTien

            // Chuyển đổi giá trị timestamp từ dạng string sang dạng timestamp
            const convertedTimestamp = moment(NgayThuTien).toDate();

            try {
                if (SoTienThu <= 0) throw new Error(`Không thể thêm phiếu thu tiền với số tiền thu bé hơn hoặc bằng 0.`)
                // Kiểm tra nếu phía client cung cấp giá trị cho NgayThuTien
                if (NgayThuTien) {
                    newPhieuThuTien = await PHIEUTHUTIEN.create({ NgayThuTien: convertedTimestamp, ...args });
                    return newPhieuThuTien;
                } else {
                    newPhieuThuTien = await PHIEUTHUTIEN.create(args);
                    return newPhieuThuTien;
                }

            } catch (error) {
                console.log('Error: ', error);
                throw new Error(`Không thể thêm phiếu thu tiền vì: ${error}`)
            }
        },
        updatePhieuthutien: async (_, args) => {
            const { MaPhieuThuTien, ...rest } = args;

            try {
                const result = await PHIEUTHUTIEN.update(
                    rest,
                    { where: { MaPhieuThuTien } }
                );

                return result[0] > 0 ? { MaPhieuThuTien, ...rest } : null;
            } catch (error) {
                console.log('Error: ', error);
                throw new Error('Failed to update PHIEUTHUTIEN');
            }
        },
        deletePhieuthutien: async (_, args) => {
            const { MaPhieuThuTien } = args;
            try {
                const phieuthutien = await PHIEUTHUTIEN.findByPk(MaPhieuThuTien);
                if (!phieuthutien) {
                    throw new Error('PHIEUTHUTIEN not found');
                }
                await phieuthutien.destroy();
                return phieuthutien;
            } catch (error) {
                console.log('Error: ', error);
                throw new Error(`Failed to delete PHIEUTHUTIEN: ${error}`);
            }
        },
    }
};

export default resolvers