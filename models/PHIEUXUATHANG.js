import { Sequelize } from 'sequelize'

export default function (sequelize, DataTypes) {
  return sequelize.define('PHIEUXUATHANG', {
    MaPhieuXuat: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    MaDaiLy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'DAILY',
        key: 'MaDaiLy'
      }
    },
    NgayLapPhieu: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    TongTien: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'PHIEUXUATHANG',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaPhieuXuat" },
        ]
      },
      {
        name: "FK_PHIEUXUATHANG_DAILY",
        using: "BTREE",
        fields: [
          { name: "MaDaiLy" },
        ]
      },
    ]
  });
};
