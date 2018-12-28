import mysql from './db';
import Sequelize from 'sequelize';

const UserApp = mysql.define('uc_user_app', {
    appid: {type: Sequelize.BIGINT, primaryKey: true},
    uid: {type: Sequelize.BIGINT, primaryKey: true},
    status: {type: Sequelize.INTEGER}
}, {
    tableName: 'uc_user_app',
    timestamps: true,
    freezeTableName: true
});

export default UserApp;