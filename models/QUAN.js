import { Sequelize } from 'sequelize'

export default function (sequelize, DataTypes) {
  return sequelize.define('QUAN', {
    MaQuan: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TenQuan: {
      type: DataTypes.STRING(40),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'QUAN',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaQuan" },
        ]
      },
    ]
  });
};
