import { normalUtil } from '../utils';
import { userService, accessTokenService, appService, imageService } from '../services';
import md5 from 'md5';

const packData = normalUtil.packData;
const validator = normalUtil.validator;
const deepClone = normalUtil.deepClone;
const redirectData = normalUtil.redirectData;

const userInfo = async function (ctx) {
    const request = ctx.request.body;
    const tmpToken = request.access_token;
    if (!tmpToken) {
        return packData(412, 'error', 'access-token-empty');
    }
    const uid = ctx.cache.pull(tmpToken);
    if (!uid) {
        return packData(412, 'error', 'access-token-expired');
    }
    return packData(200, 'success', await userService.findOne({id: uid}));
};

const logined = async function (ctx) {
    const request = ctx.request.body;
    if (!ctx.session.user) {
        return redirectData(401, '/error', 'no-logined');
    }
    // const token = await accessTokenService.generateRefreshToken(user.dataValues.id);
    try {
        if (request.appid) {
            const app = await appService.findOne({id: request.appid.replace('fs', '')});
            if (!app.dataValues.id) {
                return redirectData(404, '/error', 'data-not-find');
            }
            const tmpToken = await accessTokenService.refreshTmpToken(ctx, ctx.session.user.id);
            return redirectData(302, `${app.url}?access_token=${tmpToken}`);
        } else {
            return redirectData(412, '/error', 'input-invalidate-empty');
        }
    } catch (e) {
        console.log(e);
        ctx.logger.getLogger('error').error(e);
        return redirectData(500, '/error', 'mysql-error');
    }
};

const checkLogin = async function (ctx) {
    const request = ctx.request.body;
    const account = request.account;
    const appid = (request.appid || '').replace('fs', '');
    let password = request.password;
    if (validator.isEmpty(password) || validator.isEmpty(account)) {
        return packData(412, 'error', 'input-invalidate-empty');
    }
    password = md5(password);
    try {
        const user = await userService.findOne({account});
        if (user && user.password === password) {
            let isAuth = false;
            if (appid) {
                let apps = await user.getApp();
                apps = deepClone(apps);
                const appIds = apps.map(val => {
                    return {
                        id: val.id,
                        status: val.uc_user_app.status
                    };
                });
                isAuth = !!(appIds.filter(v => Number(v.id) === Number(appid) && v.status).length);
            }
            if (appid && !isAuth) {
                return packData(403, 'error', 'no-auth-app');
            }
            delete user.dataValues.password;
            ctx.session.user = user;
            return packData(200, 'success', {user});
        } else {
            return packData(401.1, 'error', 'login-invalidate');
        }
    } catch (e) {
        console.log(e);
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
};

const create = async function (ctx) {
    try {
        const request = ctx.request.body;
        const currentUser = await userService.findOne({account: request.account});
        if (currentUser && currentUser.dataValues.id) {
            return packData(403, 'error', 'user-exist');
        }
        if (!request.password) {
            request.password = md5('Koauc123#');
        }
        const user = await userService.create(request);

        return packData(200, 'success', user);
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
        const users = await userService.findAndCountAll(limit, offset, request.keyword, request.includes);
        return packData(200, 'success', users);
    } catch (e) {
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
};

const findUserByLoginId = async function (ctx) {
    const user = ctx.session.user;
    let account = null;
    if (user) {
        account = user.account;
    } else {
        account = ctx.request.params.account;
    }
    if (!account) {
        return packData(412, 'error', 'input-invalidate-empty');
    }
    try {
        const user = await userService.findOne({account});
        if (user) {
            delete user.dataValues.password;
        }
        return packData(200, 'success', user);
    } catch (e) {
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
};

const updateUser = async function (ctx) {
    const request = ctx.request.body;
    const id = request.id;
    if (!id) {
        return packData(412, 'error', 'input-invalidate-empty');
    }
    try {
        delete request.password;
        delete request.account;
        delete request.id;
        const user = await userService.update(request, {id});
        return packData(200, 'success', user);
    } catch (e) {
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
};

const updatePwd = async function (ctx) {
    const request = ctx.request.body;
    const user = ctx.session.user;
    const id = user.id;
    const oldPwd = md5(request.oldPassword);
    const newPwd = md5(request.newPassword);

    if (!oldPwd || !newPwd) {
        return packData(412, 'error', 'input-invalidate-empty');
    }

    try {
        const user = await userService.findOne({id});
        if (user.password === oldPwd) {
            const result = await userService.update({password: newPwd}, {id});
            return packData(200, 'success', result);
        } else {
            return packData(412, 'error', 'input-invalidate-oldPwd');
        }
    } catch (e) {
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
};

const logout = async function (ctx) {
    ctx.session.user = null;
    // const act = ctx.request.body.access_token || ctx.header.access_token;
    // accessTokenService.remove();
    return packData(200, 'success', {});
};

const remove = async function (ctx) {
    const request = ctx.request.body;
    const params = ctx.params;
    try {
        const user = await userService.findOne({id: params.id});
        if (user.dataValues.id === 1) {
            return packData(403, 'error', 'can-not-delete-fishelly');
        }
        const image = await userService.delete({id: params.id});
        return packData(200, 'success', image);
    } catch (e) {
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
};

export default {
    logined,
    checkLogin,
    create,
    updateUser,
    findUserByLoginId,
    updatePwd,
    logout,
    userInfo,
    remove,
    findAllByPage
};
