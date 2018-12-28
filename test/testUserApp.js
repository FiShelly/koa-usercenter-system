import { userAppService, userService, appService } from '../app/services/';
import { normalUtil } from '../app/utils';

const deepClone = normalUtil.deepClone;

function testCreate () {
    userAppService.create({
        uid: 1,
        appid: 1
    });
}

async function testFindOne () {
    // const user = await userService.findOne({id: 1});
    // const app1 = await appService.findOne({id: 1});
    // const app2 = await appService.findOne({id: 2});
    // const app3 = await appService.findOne({id: 3});
    // const userApp = await user.getUserapp();
    // user.removeApp(app3);
    // console.log(user);
    // app.update({name: 'test-new-1'}, {where: {id: 1}});
    const userApps = await userService.findAndCountAll(0, 10, '', true);
    console.log(userApps);
}

testFindOne();
// testCreate();