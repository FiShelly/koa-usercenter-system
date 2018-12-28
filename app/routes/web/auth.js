import koaRouter from 'koa-router';
import { userAppController } from '../../controllers';

const router = koaRouter();

router.post('/', async function (ctx, next) {
    ctx.body = await userAppController.create(ctx);
});

router.put('/:appId', async function (ctx, next) {
    ctx.body = await userAppController.updateUserApp(ctx);
});

router.delete('/:uid/:appid', async function (ctx, next) {
    ctx.body = await userAppController.remove(ctx);
});

router.get('/user/apps', async function (ctx, next) {
    ctx.body = await userAppController.getUserApps(ctx);
});

export default router;
