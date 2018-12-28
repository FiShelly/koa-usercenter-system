import koaRouter from 'koa-router';
import { userController, userAppController } from '../../controllers';

const router = koaRouter();

router.post('/logined', async function (ctx, next) {
    const data = await userController.logined(ctx);
    ctx.status = data.status;
    if (ctx.status > 400) {

    } else {
        ctx.redirect(data.url);
    }
});

router.get('/logout', async function (ctx, next) {
    ctx.body = await userController.logout(ctx);
});

router.put('/', async function (ctx, next) {
    ctx.body = await userController.updateUser(ctx);
});

router.post('/', async function (ctx, next) {
    ctx.body = await userController.create(ctx);
});

router.get('/', async function (ctx, next) {
    ctx.body = await userController.findAllByPage(ctx);
});

router.delete('/:id', async function (ctx) {
    ctx.body = await  userController.remove(ctx);
});

export default router;
