import { Sequelize } from 'sequelize'

export default function (sequelize, DataTypes) {
  return sequelize.define('BAOCAODOANHSO', {
    MaBaoCaoDoanhSo: {
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
    tableName: 'BAOCAODOANHSO',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaBaoCaoDoanhSo" },
        ]
      },
    ]
  });
};
