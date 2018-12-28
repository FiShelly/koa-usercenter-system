import mysql from './db';
import Sequelize from 'sequelize';

const User = mysql.define('uc_user', {
    id: {type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true},
    account: {type: Sequelize.STRING(256), allowNull: false},
    name: {type: Sequelize.STRING(256), allowNull: true},
    position: {type: Sequelize.STRING(256), allowNull: true},
    signature: {type: Sequelize.STRING(256), allowNull: true},
    label: {type: Sequelize.STRING(256), allowNull: true},
    introduce: {type: Sequelize.TEXT, allowNull: true},
    password: {type: Sequelize.TEXT, allowNull: false},
    headImg: {type: Sequelize.INTEGER, allowNull: true}
}, {
    tableName: 'uc_user',
    timestamps: true,
    freezeTableName: true
});

export default User;