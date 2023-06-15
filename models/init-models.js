import sequelize from "../src/database/sequelize.js";
import { DataTypes } from "sequelize";
import BAOCAOCONGNO from "./BAOCAOCONGNO.js";
import BAOCAODOANHSO from "./BAOCAODOANHSO.js";
import CT_BCCN from "./CT_BCCN.js";
import CT_BCDS from "./CT_BCDS.js";
import CT_PHIEUXUATHANG from "./CT_PHIEUXUATHANG.js";
import DAILY from "./DAILY.js";
import DVT from "./DVT.js";
import LOAIDAILY from "./LOAIDAILY.js";
import MATHANG from "./MATHANG.js";
import PHIEUNHAPHANG from "./PHIEUNHAPHANG.js";
import PHIEUTHUTIEN from "./PHIEUTHUTIEN.js";
import PHIEUXUATHANG from "./PHIEUXUATHANG.js";
import QUAN from "./QUAN.js";
import PHIEUGHINO from "./PHIEUGHINO.js";

const initModels = (sequelize, DataTypes) => {
  const BAOCAOCONGNOModel = BAOCAOCONGNO(sequelize, DataTypes);
  const BAOCAODOANHSOModel = BAOCAODOANHSO(sequelize, DataTypes);
  const CT_BCCNModel = CT_BCCN(sequelize, DataTypes);
  const CT_BCDSModel = CT_BCDS(sequelize, DataTypes);
  const CT_PHIEUXUATHANGModel = CT_PHIEUXUATHANG(sequelize, DataTypes);
  const DAILYModel = DAILY(sequelize, DataTypes);
  const DVTModel = DVT(sequelize, DataTypes);
  const LOAIDAILYModel = LOAIDAILY(sequelize, DataTypes);
  const MATHANGModel = MATHANG(sequelize, DataTypes);
  const PHIEUNHAPHANGModel = PHIEUNHAPHANG(sequelize, DataTypes);
  const PHIEUTHUTIENModel = PHIEUTHUTIEN(sequelize, DataTypes);
  const PHIEUXUATHANGModel = PHIEUXUATHANG(sequelize, DataTypes);
  const QUANModel = QUAN(sequelize, DataTypes);
  const PHIEUGHINOModel = PHIEUGHINO(sequelize, DataTypes);

  CT_BCCNModel.belongsTo(BAOCAOCONGNOModel, { as: "MaBaoCaoCongNo_BAOCAOCONGNO", foreignKey: "MaBaoCaoCongNo" });
  BAOCAOCONGNOModel.hasMany(CT_BCCNModel, { as: "CT_BCCNs", foreignKey: "MaBaoCaoCongNo" });
  CT_BCDSModel.belongsTo(BAOCAODOANHSOModel, { as: "MaBaoCaoDoanhSo_BAOCAODOANHSO", foreignKey: "MaBaoCaoDoanhSo" });
  BAOCAODOANHSOModel.hasMany(CT_BCDSModel, { as: "CT_BCDs", foreignKey: "MaBaoCaoDoanhSo" });
  CT_BCCNModel.belongsTo(DAILYModel, { as: "MaDaiLy_DAILY", foreignKey: "MaDaiLy" });
  DAILYModel.hasMany(CT_BCCNModel, { as: "CT_BCCNs", foreignKey: "MaDaiLy" });
  CT_BCDSModel.belongsTo(DAILYModel, { as: "MaDaiLy_DAILY", foreignKey: "MaDaiLy" });
  DAILYModel.hasMany(CT_BCDSModel, { as: "CT_BCDs", foreignKey: "MaDaiLy" });
  PHIEUTHUTIENModel.belongsTo(DAILYModel, { as: "MaDaiLy_DAILY", foreignKey: "MaDaiLy" });
  DAILYModel.hasMany(PHIEUTHUTIENModel, { as: "PHIEUTHUTIENs", foreignKey: "MaDaiLy" });
  PHIEUXUATHANGModel.belongsTo(DAILYModel, { as: "MaDaiLy_DAILY", foreignKey: "MaDaiLy" });
  DAILYModel.hasMany(PHIEUXUATHANGModel, { as: "PHIEUXUATHANGs", foreignKey: "MaDaiLy" });
  MATHANGModel.belongsTo(DVTModel, { as: "MaDVT_DVT", foreignKey: "MaDVT" });
  DVTModel.hasMany(MATHANGModel, { as: "MATHANGs", foreignKey: "MaDVT" });
  DAILYModel.belongsTo(LOAIDAILYModel, { as: "MaLoaiDaiLy_LOAIDAILY", foreignKey: "MaLoaiDaiLy" });
  LOAIDAILYModel.hasMany(DAILYModel, { as: "DAILies", foreignKey: "MaLoaiDaiLy" });
  CT_PHIEUXUATHANGModel.belongsTo(MATHANGModel, { as: "MaMatHang_MATHANG", foreignKey: "MaMatHang" });
  MATHANGModel.hasMany(CT_PHIEUXUATHANGModel, { as: "CT_PHIEUXUATHANGs", foreignKey: "MaMatHang" });
  PHIEUNHAPHANGModel.belongsTo(MATHANGModel, { as: "MaMatHang_MATHANG", foreignKey: "MaMatHang" });
  MATHANGModel.hasMany(PHIEUNHAPHANGModel, { as: "PHIEUNHAPHANGs", foreignKey: "MaMatHang" });
  CT_PHIEUXUATHANGModel.belongsTo(PHIEUXUATHANGModel, { as: "MaPhieuXuat_PHIEUXUATHANG", foreignKey: "MaPhieuXuat" });
  PHIEUXUATHANGModel.hasMany(CT_PHIEUXUATHANGModel, { as: "CT_PHIEUXUATHANGs", foreignKey: "MaPhieuXuat" });
  DAILYModel.belongsTo(QUANModel, { as: "MaQuan_QUAN", foreignKey: "MaQuan" });
  QUANModel.hasMany(DAILYModel, { as: "DAILies", foreignKey: "MaQuan" });
  PHIEUGHINOModel.belongsTo(DAILYModel, { as: "MaDaiLy_DAILY", foreignKey: "MaDaiLy" });
  DAILYModel.hasMany(PHIEUGHINOModel, { as: "PHIEUGHINOs", foreignKey: "MaDaiLy" });

  return {
    BAOCAOCONGNO: BAOCAOCONGNOModel,
    BAOCAODOANHSO: BAOCAODOANHSOModel,
    CT_BCCN: CT_BCCNModel,
    CT_BCDS: CT_BCDSModel,
    CT_PHIEUXUATHANG: CT_PHIEUXUATHANGModel,
    DAILY: DAILYModel,
    DVT: DVTModel,
    LOAIDAILY: LOAIDAILYModel,
    MATHANG: MATHANGModel,
    PHIEUNHAPHANG: PHIEUNHAPHANGModel,
    PHIEUTHUTIEN: PHIEUTHUTIENModel,
    PHIEUXUATHANG: PHIEUXUATHANGModel,
    QUAN: QUANModel,
    PHIEUGHINO: PHIEUGHINOModel,
  };
};

export default initModels(sequelize, DataTypes)
