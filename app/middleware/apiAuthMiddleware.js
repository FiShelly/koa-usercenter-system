import { normalUtil } from '../utils';
import { appService } from '../services';
import md5 from 'md5';
import moment from 'moment';

const packData = normalUtil.packData;
const notAllowed = ['/api/'];

function isNotIgnore (url) {
    return !url.includes('ignore') && notAllowed.filter(val => url.includes(val)).length > 0;
}

export default function () {
    return async function (ctx, next) {
        let url = ctx.url;
        if (isNotIgnore(url)) {
            const isAuth = await checkAuth(ctx);
            if (!isAuth.result) {
                return false;
            }
        }
        await next();
    };
};

async function checkAuth (ctx) {
    let request = {};
    if (ctx.method === 'GET') {
        request = ctx.request.query;
    } else {
        request = ctx.request.body;
    }
    const token = request.token;
    const time = request.time;
    const curTime = moment().unix();
    const appid = (request.appid || '').trim();

    if (!token || !time || !appid) {
        return {
            result: false,
            data: packData(412, 'error', 'input-invalidate-empty')
        };
    }
    if (curTime - time > 60 * 50) {
        return {
            result: false,
            data: packData(403, 'error', 'expired-time')
        };
    }
    const app = await appService.findOne({id: appid.replace('fs', '')});
    if (!app) {
        return {
            result: false,
            data: packData(404, 'error', 'data-not-find')
        };
    }
    const ticket = app.ticket;
    const appToken = md5(`${ticket}${appid}${time}`);
    return {
        result: appToken === token
    };
}

