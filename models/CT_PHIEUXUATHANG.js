import { Sequelize } from 'sequelize'

export default function (sequelize, DataTypes) {
  return sequelize.define('CT_PHIEUXUATHANG', {
    MaCT_PXH: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    MaPhieuXuat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'PHIEUXUATHANG',
        key: 'MaPhieuXuat'
      }
    },
    MaMatHang: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'MATHANG',
        key: 'MaMatHang'
      }
    },
    SoLuongXuat: {
      type: DataTypes.MEDIUMINT,
      allowNull: false
    },
    DonGiaXuat: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    ThanhTien: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'CT_PHIEUXUATHANG',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaCT_PXH" },
        ]
      },
      {
        name: "FK_CT-PXH_PXH",
        using: "BTREE",
        fields: [
          { name: "MaPhieuXuat" },
        ]
      },
      {
        name: "FK_CT-PXH_MATHANG",
        using: "BTREE",
        fields: [
          { name: "MaMatHang" },
        ]
      },
    ]
  });
};
