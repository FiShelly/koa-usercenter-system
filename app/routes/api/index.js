import koaRouter from 'koa-router';
import image from './image';
import user from './user';
import app from './app';

const router = koaRouter();

router.use('/api/image', image.routes(), image.allowedMethods());
router.use('/api/user', user.routes(), user.allowedMethods());
router.use('/api/app', app.routes(), app.allowedMethods());

export default router;
