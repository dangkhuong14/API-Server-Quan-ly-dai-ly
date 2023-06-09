import { Sequelize } from 'sequelize'

export default function (sequelize, DataTypes) {
  return sequelize.define('BAOCAOCONGNO', {
    MaBaoCaoCongNo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Thang: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'BAOCAOCONGNO',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaBaoCaoCongNo" },
        ]
      },
    ]
  });
};
