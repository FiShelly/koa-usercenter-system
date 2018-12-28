import koaRouter from 'koa-router';
import { imageController } from '../../controllers';
import fs from 'fs';
import path from 'path';
import moment from 'moment';
import {fileUtil} from '../../utils'

const router = koaRouter();
router.get('/view/:id', async function (ctx, next) {
    const result = await imageController.findOneById(ctx);
    if (!result.data) {
        ctx.status = 404;
        return;
    }
    const image = result.data;
    const imagePath = path.join(ctx._dir_path, image.path);
    const imageStat = await fileUtil.stat(imagePath);
    if (imageStat.isFile()) {
        ctx.status = result.code;
        ctx.type = image.mime;
        ctx.body = await fileUtil.readImage(imagePath);
    }
});

export default router;