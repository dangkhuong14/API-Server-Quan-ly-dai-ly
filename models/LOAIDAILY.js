const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('LOAIDAILY', {
    MaLoaiDaiLy: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TenLoaiDaiLy: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    SoNoToiDa: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 100000000
    }
  }, {
    sequelize,
    tableName: 'LOAIDAILY',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaLoaiDaiLy" },
        ]
      },
    ]
  });
};
