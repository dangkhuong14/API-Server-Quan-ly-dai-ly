import { Sequelize } from 'sequelize'

export default function (sequelize, DataTypes) {
    return sequelize.define('PHIEUGHINO', {
        MaPhieuGhiNo: {
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
            defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
        },
        SoTienNo: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'PHIEUGHINO',
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "MaPhieuGHINO" },
                ]
            },
            {
                name: "FK_PHIEUGHINO_DAILY",
                using: "BTREE",
                fields: [
                    { name: "MaDaiLy" },
                ]
            },
        ]
    });
};
