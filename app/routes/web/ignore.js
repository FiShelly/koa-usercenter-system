import { appController, userController } from '../../controllers';
import koaRouter from 'koa-router';

const router = koaRouter();

router.post('/user/checklogin', async function (ctx, next) {
    ctx.body = await userController.checkLogin(ctx);
});

router.get('/apps/info/:id', async function (ctx, next) {
    ctx.body = await appController.findOneById2Login(ctx);
});

export default router;