import { Cache } from '../utils';

export default function () {
    const cache = new Cache();
    return async function (ctx, next) {
        ctx.cache = cache;
        await next();
    };
};
