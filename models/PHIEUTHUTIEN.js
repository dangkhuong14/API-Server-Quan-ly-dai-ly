import { Sequelize } from 'sequelize'

export default function (sequelize, DataTypes) {
  return sequelize.define('PHIEUTHUTIEN', {
    MaPhieuThuTien: {
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
    NgayThuTien: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    SoTienThu: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'PHIEUTHUTIEN',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaPhieuThuTien" },
        ]
      },
      {
        name: "FK_PHIEUTHUTIEN_DAILY",
        using: "BTREE",
        fields: [
          { name: "MaDaiLy" },
        ]
      },
    ]
  });
};
