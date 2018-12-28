import koaRouter from 'koa-router';
import { appController, userController } from '../../controllers';

const router = koaRouter();

router.post('/', async function (ctx, next) {
    ctx.body = await appController.create(ctx);
});

router.get('/', async function (ctx, next) {
    ctx.body = await appController.findAllByPage(ctx);
});

router.get('/all', async function (ctx, next) {
    ctx.body = await appController.findAll(ctx);
});

router.get('/goto', async function (ctx, next) {
    const data = await appController.gotoApp(ctx);
    ctx.status = data.status;
    if (ctx.status > 400) {

    } else {
        ctx.redirect(data.url);
    }
});

router.get('/:id', async function (ctx, next) {
    ctx.body = await appController.findOneById(ctx);
});

router.put('/:id', async function (ctx, next) {
    ctx.body = await appController.update(ctx);
});

router.delete('/:id', async function (ctx, next) {
    ctx.body = await  appController.remove(ctx);
});

export default router;
