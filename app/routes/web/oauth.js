import koaRouter from 'koa-router';
import { userController } from '../../controllers';

const router = koaRouter();

router.get('/login', async function (ctx, next) {
    ctx.body = await userController.userInfo(ctx);
});

export default router;
