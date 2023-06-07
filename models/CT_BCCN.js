const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CT_BCCN', {
    MaCT_BCCN: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    MaBaoCaoCongNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'BAOCAOCONGNO',
        key: 'MaBaoCaoCongNo'
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
    NoDau: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    PhatSinh: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    NoCuoi: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'CT_BCCN',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaCT_BCCN" },
        ]
      },
      {
        name: "FK_CT-BCCN_BCCN",
        using: "BTREE",
        fields: [
          { name: "MaBaoCaoCongNo" },
        ]
      },
      {
        name: "FK_CT-BCCN_DAILY",
        using: "BTREE",
        fields: [
          { name: "MaDaiLy" },
        ]
      },
    ]
  });
};
