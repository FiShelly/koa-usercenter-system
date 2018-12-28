import { normalUtil, httpValidate } from '../utils';
import { userService, appService, userAppService, accessTokenService } from '../services';
import md5 from 'md5';

const packData = normalUtil.packData;
const validator = normalUtil.validator;

const getUserApps = async function (ctx) {
    const user = ctx.session.user;
    if (!user) {
        return packData(401, 'error', 'no-logined');
    }
    try {
        const userApps = await userAppService.findAll({uid: user.id});
        const allApps = await appService.findAll();
        return packData(200, 'success', {
            userApps,
            allApps
        });
    } catch (e) {
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
};

const updateUserApp = async function (ctx) {
    const user = ctx.session.user;
    const params = ctx.params;
    const query = ctx.request.body;
    if (!user) {
        return packData(401, 'error', 'no-logined');
    }
    try {
        const appid = params.appId;
        const uid = user.id;
        const status = query.status || 0;
        const userApp = await userAppService.update({status}, {
            uid, appid
        });
        return packData(200, 'success', userApp);
    } catch (e) {
        console.log(e);
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
};

const create = async function (ctx) {
    try {
        const request = ctx.request.body;
        const isHasUserApp = await userAppService.findOne({
            appid: request.appid,
            uid: request.uid
        });
        if (isHasUserApp) {
            return packData(412, 'error', 'data-is-exist');
        }
        const user = await userService.findOne({id: request.uid});
        const app = await appService.findOne({id: request.appid});
        if (!user || !app) {
            return packData(403, 'error', 'data-not-find');
        }
        const userApp = await user.addApp(app, {through: {status: 1}});
        return packData(200, 'success', null);
    } catch (e) {
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }

};

const remove = async function (ctx) {
    const params = ctx.params;
    try {
        const auth = await userAppService.delete({
            appid: params.appid,
            uid: params.uid
        });
        return packData(200, 'success', auth);
    } catch (e) {
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
};

export default {
    getUserApps,
    create,
    remove,
    updateUserApp
};
