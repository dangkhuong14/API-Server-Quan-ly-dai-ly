var DataTypes = require("sequelize").DataTypes;
var _BAOCAOCONGNO = require("./BAOCAOCONGNO");
var _BAOCAODOANHSO = require("./BAOCAODOANHSO");
var _CT_BCCN = require("./CT_BCCN");
var _CT_BCDS = require("./CT_BCDS");
var _CT_PHIEUXUATHANG = require("./CT_PHIEUXUATHANG");
var _DAILY = require("./DAILY");
var _DVT = require("./DVT");
var _LOAIDAILY = require("./LOAIDAILY");
var _MATHANG = require("./MATHANG");
var _PHIEUNHAPHANG = require("./PHIEUNHAPHANG");
var _PHIEUTHUTIEN = require("./PHIEUTHUTIEN");
var _PHIEUXUATHANG = require("./PHIEUXUATHANG");
var _QUAN = require("./QUAN");

function initModels(sequelize) {
  var BAOCAOCONGNO = _BAOCAOCONGNO(sequelize, DataTypes);
  var BAOCAODOANHSO = _BAOCAODOANHSO(sequelize, DataTypes);
  var CT_BCCN = _CT_BCCN(sequelize, DataTypes);
  var CT_BCDS = _CT_BCDS(sequelize, DataTypes);
  var CT_PHIEUXUATHANG = _CT_PHIEUXUATHANG(sequelize, DataTypes);
  var DAILY = _DAILY(sequelize, DataTypes);
  var DVT = _DVT(sequelize, DataTypes);
  var LOAIDAILY = _LOAIDAILY(sequelize, DataTypes);
  var MATHANG = _MATHANG(sequelize, DataTypes);
  var PHIEUNHAPHANG = _PHIEUNHAPHANG(sequelize, DataTypes);
  var PHIEUTHUTIEN = _PHIEUTHUTIEN(sequelize, DataTypes);
  var PHIEUXUATHANG = _PHIEUXUATHANG(sequelize, DataTypes);
  var QUAN = _QUAN(sequelize, DataTypes);

  CT_BCCN.belongsTo(BAOCAOCONGNO, { as: "MaBaoCaoCongNo_BAOCAOCONGNO", foreignKey: "MaBaoCaoCongNo"});
  BAOCAOCONGNO.hasMany(CT_BCCN, { as: "CT_BCCNs", foreignKey: "MaBaoCaoCongNo"});
  CT_BCDS.belongsTo(BAOCAODOANHSO, { as: "MaBaoCaoDoanhSo_BAOCAODOANHSO", foreignKey: "MaBaoCaoDoanhSo"});
  BAOCAODOANHSO.hasMany(CT_BCDS, { as: "CT_BCDs", foreignKey: "MaBaoCaoDoanhSo"});
  CT_BCCN.belongsTo(DAILY, { as: "MaDaiLy_DAILY", foreignKey: "MaDaiLy"});
  DAILY.hasMany(CT_BCCN, { as: "CT_BCCNs", foreignKey: "MaDaiLy"});
  CT_BCDS.belongsTo(DAILY, { as: "MaDaiLy_DAILY", foreignKey: "MaDaiLy"});
  DAILY.hasMany(CT_BCDS, { as: "CT_BCDs", foreignKey: "MaDaiLy"});
  PHIEUTHUTIEN.belongsTo(DAILY, { as: "MaDaiLy_DAILY", foreignKey: "MaDaiLy"});
  DAILY.hasMany(PHIEUTHUTIEN, { as: "PHIEUTHUTIENs", foreignKey: "MaDaiLy"});
  PHIEUXUATHANG.belongsTo(DAILY, { as: "MaDaiLy_DAILY", foreignKey: "MaDaiLy"});
  DAILY.hasMany(PHIEUXUATHANG, { as: "PHIEUXUATHANGs", foreignKey: "MaDaiLy"});
  MATHANG.belongsTo(DVT, { as: "MaDVT_DVT", foreignKey: "MaDVT"});
  DVT.hasMany(MATHANG, { as: "MATHANGs", foreignKey: "MaDVT"});
  DAILY.belongsTo(LOAIDAILY, { as: "MaLoaiDaiLy_LOAIDAILY", foreignKey: "MaLoaiDaiLy"});
  LOAIDAILY.hasMany(DAILY, { as: "DAILies", foreignKey: "MaLoaiDaiLy"});
  CT_PHIEUXUATHANG.belongsTo(MATHANG, { as: "MaMatHang_MATHANG", foreignKey: "MaMatHang"});
  MATHANG.hasMany(CT_PHIEUXUATHANG, { as: "CT_PHIEUXUATHANGs", foreignKey: "MaMatHang"});
  PHIEUNHAPHANG.belongsTo(MATHANG, { as: "MaMatHang_MATHANG", foreignKey: "MaMatHang"});
  MATHANG.hasMany(PHIEUNHAPHANG, { as: "PHIEUNHAPHANGs", foreignKey: "MaMatHang"});
  CT_PHIEUXUATHANG.belongsTo(PHIEUXUATHANG, { as: "MaPhieuXuat_PHIEUXUATHANG", foreignKey: "MaPhieuXuat"});
  PHIEUXUATHANG.hasMany(CT_PHIEUXUATHANG, { as: "CT_PHIEUXUATHANGs", foreignKey: "MaPhieuXuat"});
  DAILY.belongsTo(QUAN, { as: "MaQuan_QUAN", foreignKey: "MaQuan"});
  QUAN.hasMany(DAILY, { as: "DAILies", foreignKey: "MaQuan"});

  return {
    BAOCAOCONGNO,
    BAOCAODOANHSO,
    CT_BCCN,
    CT_BCDS,
    CT_PHIEUXUATHANG,
    DAILY,
    DVT,
    LOAIDAILY,
    MATHANG,
    PHIEUNHAPHANG,
    PHIEUTHUTIEN,
    PHIEUXUATHANG,
    QUAN,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
