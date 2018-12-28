import mysql from './db';
import Sequelize from 'sequelize';

const AccessToken = mysql.define('uc_access_token', {
    id: {type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true},
    uid: {type: Sequelize.BIGINT},
    access_token: {type: Sequelize.STRING(256), allowNull: false},
    refresh_token: {type: Sequelize.STRING(256), allowNull: false},
    expired_time: {type: Sequelize.BIGINT, allowNull: false}
}, {
    tableName: 'uc_access_token',
    timestamps: true,
    freezeTableName: true
});

export default AccessToken;