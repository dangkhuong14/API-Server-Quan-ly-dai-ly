const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CT_BCDS', {
    MaCT_BCDS: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    MaBaoCaoDoanhSo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'BAOCAODOANHSO',
        key: 'MaBaoCaoDoanhSo'
      }
    },
    MaDaiLy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'DAILY',
        key: 'MaDaiLy'
      }
    },
    SoPhieuXuat: {
      type: DataTypes.MEDIUMINT,
      allowNull: false
    },
    TongTriGia: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    TyLe: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'CT_BCDS',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaCT_BCDS" },
        ]
      },
      {
        name: "FK_CT-BCDS_BCDS",
        using: "BTREE",
        fields: [
          { name: "MaBaoCaoDoanhSo" },
        ]
      },
      {
        name: "FK_CT-BCDS_DAILY",
        using: "BTREE",
        fields: [
          { name: "MaDaiLy" },
        ]
      },
    ]
  });
};
