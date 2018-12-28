import mysql from './db';
import Sequelize from 'sequelize';

const Image = mysql.define('uc_image', {
    id: {type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true},
    name: {type: Sequelize.STRING, allowNull: false},
    ext: {type: Sequelize.STRING, allowNull: false},
    mime: {type: Sequelize.STRING, allowNull: false},
    path: {type: Sequelize.STRING, allowNull: false},
    size: {type: Sequelize.INTEGER, allowNull: false},
    date: {type: Sequelize.BIGINT, allowNull: false}
}, {
    tableName: 'uc_image',
    timestamps: true,
    freezeTableName: true
});

export default Image;