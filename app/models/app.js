import mysql from './db';
import Sequelize from 'sequelize';

const App = mysql.define('uc_app', {
    id: {type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true},
    name: {type: Sequelize.STRING(256), allowNull: false},
    url: {type: Sequelize.STRING(256), allowNull: false},
    icon: {type: Sequelize.STRING(256)},
    ticket: {type: Sequelize.STRING(256), allowNull: false}
}, {
    tableName: 'uc_app',
    timestamps: true,
    freezeTableName: true
});

export default App;