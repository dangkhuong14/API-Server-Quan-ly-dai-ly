const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MATHANG', {
    MaMatHang: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TenMatHang: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    MaDVT: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'DVT',
        key: 'MaDVT'
      }
    },
    SoLuongTon: {
      type: DataTypes.MEDIUMINT,
      allowNull: false
    },
    DonGiaNhap: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'MATHANG',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaMatHang" },
        ]
      },
      {
        name: "FK_MATHANG_DVT",
        using: "BTREE",
        fields: [
          { name: "MaDVT" },
        ]
      },
    ]
  });
};
