import { normalUtil } from '../utils';
import { accessTokenService } from '../services';

const packData = normalUtil.packData;
const notAllowed = ['/web/'];
const ignoreArray = ['/ignore','/login'];

function isNotIgnore (url) {
    return !ignoreArray.filter(val => !url.includes(val)).length && notAllowed.filter(val => url.includes(val)).length > 0;
}

export default function () {
    return async function (ctx, next) {
        let url = ctx.url;
        const isAuth = await checkAuth(ctx);
        if (isNotIgnore(url) && !isAuth) {
            ctx.body = packData(401, 'error', 'no-logined');
            return false;
        }
        await next();
    };
};

async function checkAuth (ctx) {
    const accessToken = ctx.header.access_token;
    const user = ctx.session.user;
    let uid = null;
    if (!accessToken && user) {
        uid = user.id;
    } else if (accessToken) {
        uid = await accessTokenService.getAccessTokenRelatedUID(accessToken);
    }
    return !!uid;
}

