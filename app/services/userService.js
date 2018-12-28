import baseService from './baseService';
import { user as model, app } from '../models';
import Sequelize from 'sequelize';

const Op = Sequelize.Op;

const userService = {
    model: model,
    findAndCountAll: function (limit, offset, keyword, includes) {
        const opt = {};
        if (keyword) {
            opt.$or = {};
            opt.$or.name = {[Op.like]: `%${keyword}%`};
            opt.$or.account = {[Op.like]: `%${keyword}%`};
        }
        const condition = {
            order: [['id', 'asc']],
            where: opt,
            limit, offset
        };
        if (includes){
            condition.include = {
                model: app ,
                as: 'app'
            };
        }
        return this.model.findAndCountAll(condition);
    }
};

export default Object.assign(userService, baseService);
