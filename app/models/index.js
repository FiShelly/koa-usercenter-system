import access_token from './access_token';
import app from './app';
import user from './user';
import image from './image';
import userApp from './user_app';

user.belongsToMany(app, {as: 'app', through: userApp, foreignKey: 'uid'});
app.belongsToMany(user, {as: 'user', through: userApp, foreignKey: 'appid'});

export {
    access_token, app, user, image, userApp
};
