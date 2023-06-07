const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DAILY', {
    MaDaiLy: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TenDaiLy: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    MaLoaiDaiLy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'LOAIDAILY',
        key: 'MaLoaiDaiLy'
      }
    },
    DienThoai: {
      type: DataTypes.STRING(12),
      allowNull: false
    },
    DiaChi: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    MaQuan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'QUAN',
        key: 'MaQuan'
      }
    },
    NgayTiepNhan: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    TienNo: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    Email: {
      type: DataTypes.STRING(40),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'DAILY',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaDaiLy" },
        ]
      },
      {
        name: "FK_DAILY_LOAIDAILY",
        using: "BTREE",
        fields: [
          { name: "MaLoaiDaiLy" },
        ]
      },
      {
        name: "FK_DAILY_QUAN",
        using: "BTREE",
        fields: [
          { name: "MaQuan" },
        ]
      },
    ]
  });
};
