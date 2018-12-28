import koaRouter from 'koa-router';
import user from './user';
import app from './app';
import image from './image';
import auth from './auth';
import ignore from './ignore';
import oauth from './oauth';

const router = koaRouter();

router.use('/web/user', user.routes(), user.allowedMethods());
router.use('/web/image', image.routes(), image.allowedMethods());
router.use('/web/apps', app.routes(), app.allowedMethods());
router.use('/web/auth', auth.routes(), auth.allowedMethods());
router.use('/web/ignore', ignore.routes(), ignore.allowedMethods());
router.use('/web/oauth', oauth.routes(), oauth.allowedMethods());

export default router;