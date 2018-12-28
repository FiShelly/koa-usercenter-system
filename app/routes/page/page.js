import koaRouter from 'koa-router';
import {readFileSync} from 'fs';
import {join} from 'path';

const adminRouter = koaRouter();
let template = null;

async function fuc (ctx, next) {
    if (!template) {
        template = readFileSync(join(ctx._dir_path, 'public/admin', 'index.html')).toString();
    }
    ctx.type = 'html';
    ctx.body = template.replace('${CSRF}', ctx.csrf);
}

adminRouter.get('/', fuc);

export default adminRouter;
