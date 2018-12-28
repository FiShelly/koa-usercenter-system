import { normalUtil } from '../utils';
import { accessTokenService, appService } from '../services';

const packData = normalUtil.packData;
const validator = normalUtil.validator;
const redirectData = normalUtil.redirectData;

const create = async function (ctx) {
    const request = ctx.request.body;
    try {
        const app = await appService.create(request);
        return packData(200, 'success', app);
    } catch (e) {
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
};

const findOneById = async function (ctx) {
    const params = ctx.params;
    try {
        const app = await appService.findOne({id: params.id});
        if (!app) {
            return packData(404, 'error', 'data-not-find');
        }
        if (ctx.url.includes('/api/')) {
            delete app.dataValues.ticket;
        }
        return packData(200, 'success', app);
    } catch (e) {
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
};

const findOneById2Login = async function (ctx) {
    const params = ctx.params;
    try {
        const app = await appService.findOne({id: params.id.replace('fs', '')});
        if (!app) {
            return packData(404, 'error', 'data-not-find');
        }
        delete app.dataValues.ticket;
        delete app.dataValues.id;
        return packData(200, 'success', app);
    } catch (e) {
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
};

const remove = async function (ctx) {
    const request = ctx.request.body;
    const params = ctx.params;
    try {
        const app = await appService.delete({id: params.id});
        return packData(200, 'success', app);
    } catch (e) {
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
};

const findAll = async function (ctx) {
    const request = ctx.request.body;
    const params = ctx.params;
    try {
        const apps = await appService.findAll();
        if (ctx.url.includes('/api/')) {
            apps.forEach(val => {
                delete val.dataValues.ticket;
            });
        }
        return packData(200, 'success', apps);
    } catch (e) {
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
};

const findAllByPage = async function (ctx) {
    const request = ctx.request.query;
    let limit = request.limit;
    let offset = request.offset;
    if (validator.isEmpty(limit) || validator.isEmpty(offset)) {
        return packData(412, 'error', 'input-invalidate-empty');
    }
    if (!validator.isNumeric(limit) || !validator.isNumeric(offset)) {
        return packData(412, 'error', 'input-invalidate-number');
    }
    limit = Number(limit);
    offset = Number(offset);
    try {
        const apps = await appService.findAndCountAll(limit, offset, request.keyword);
        if (ctx.url.includes('/api/')) {
            apps.rows.forEach(val => {
                delete val.dataValues.ticket;
            });
        }
        return packData(200, 'success', apps);
    } catch (e) {
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
};

const update = async function (ctx) {
    const request = ctx.request.body;
    const params = ctx.params;
    const id = params.id;
    try {
        const app = await appService.update(request, {id});
        return packData(200, 'success', app);
    } catch (e) {
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
};

const gotoApp = async function (ctx) {
    const query = ctx.request.query;
    const redirect_url = query.redirect_url;
    if (!redirect_url) {
        return redirectData(412, '/error', 'input-invalidate-empty');
    }
    const tmpToken = await accessTokenService.refreshTmpToken(ctx, ctx.session.user.id);
    return redirectData(302, `${redirect_url}?access_token=${tmpToken}`);
};

export default {
    create, findOneById, update, remove, findAll, findAllByPage,
    findOneById2Login, gotoApp
};
