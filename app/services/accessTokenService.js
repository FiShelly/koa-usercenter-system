import baseService from './baseService';
import { access_token as model } from '../models';
import Sequelize from 'sequelize';
import moment from 'moment';
import uuidv1 from 'uuid/v1';

const Op = Sequelize.Op;

const accessTokenService = {
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
    },
    getAccessTokenRelatedUID: async function (act) {
        const tokenInfo = await this.model.findOne({'access_token': act});
        if (tokenInfo.uid) {
            return false;
        } else if (tokenInfo.expired_time < moment().unix()) {
            return false;
        }
        return tokenInfo.uid;
    },
    refreshAccessToken: async function (act) {
        const tokenInfo = await this.model.findOne({'access_token': act});
        if (tokenInfo.uid) {
            return false;
        }
        tokenInfo.access_token = `access@${uuidv1()}`;
        tokenInfo.expired_time = moment().unix() + 7200;
        this.model.update(tokenInfo, {id: tokenInfo.id});
        return tokenInfo;
    },
    generateRefreshToken: function (uid) {
        const tokenInfo = {
            uid,
            refresh_token: `refresh@${uuidv1()}`,
            access_token: `access@${uuidv1()}`,
            expired_time: moment().unix() + 7200,
        };
        return this.model.create(tokenInfo);
    },
    refreshTmpToken: async function (ctx, uid) {
        if (!uid) {
            throw new Error('parameter error!', 1);
        }
        const tmp_token = `tmp@${uuidv1()}`;
        ctx.cache.set(tmp_token, uid);
        return tmp_token;
    },
    checkAccessToken: async function (opt, ctx) {
        let tokenInfo = await this.findOne(opt);
        if (tokenInfo.expired_time < moment().unix()) {
            if (ctx.session.user) {
                tokenInfo = await this.model.refreshAccessToken(tokenInfo.access_token);
                return tokenInfo.dataValues;
            }
            return false;
        }
        return tokenInfo.dataValues;
    }
};

export default Object.assign(accessTokenService, baseService);