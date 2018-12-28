import koaRouter from 'koa-router';
import { appController } from '../../controllers';

const router = koaRouter();

router.get('/', async function (ctx, next) {
    ctx.body = await appController.findAllByPage(ctx);
});

router.get('/all', async function (ctx, next) {
    ctx.body = await appController.findAll(ctx);
});

export default router;
