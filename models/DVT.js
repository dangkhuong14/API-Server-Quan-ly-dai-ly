import { Sequelize } from 'sequelize'

export default function (sequelize, DataTypes) {
  return sequelize.define('DVT', {
    MaDVT: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TenDVT: {
      type: DataTypes.STRING(40),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'DVT',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaDVT" },
        ]
      },
    ]
  });
};
