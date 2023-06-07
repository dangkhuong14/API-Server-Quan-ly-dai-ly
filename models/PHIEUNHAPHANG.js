const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PHIEUNHAPHANG', {
    MaPhieuNhap: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    MaMatHang: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'MATHANG',
        key: 'MaMatHang'
      }
    },
    SoLuong: {
      type: DataTypes.MEDIUMINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'PHIEUNHAPHANG',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaPhieuNhap" },
        ]
      },
      {
        name: "FK_PHIEUNHAPHANG_MATHANG",
        using: "BTREE",
        fields: [
          { name: "MaMatHang" },
        ]
      },
    ]
  });
};
