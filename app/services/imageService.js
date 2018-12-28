import baseService from './baseService';
import { image as model } from '../models';
import Sequelize from 'sequelize';

const Op = Sequelize.Op;

const imageService = {
    model: model,
    findAll: function (opt) {
        opt = {where: opt};
        return this.model.findAll(opt);
    },
    findAndCountAll: function (limit, offset, keyword) {
        const opt = {};
        if (keyword) {
            opt.name = {[Op.like]: `%${keyword}%`};
        }
        return this.model.findAndCountAll({
            order: [['id', 'desc']],
            where: opt,
            limit, offset
        });
    }
};

export default Object.assign(imageService, baseService);