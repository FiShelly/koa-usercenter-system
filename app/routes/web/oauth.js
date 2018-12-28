import koaRouter from 'koa-router';
import { userController } from '../../controllers';

const router = koaRouter();

router.post('/login', async function (ctx, next) {
    ctx.body = await userController.userInfo(ctx);
});

export default router;
