/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/app.js":
/*!********************!*\
  !*** ./app/app.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa */ \"koa\");\n/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var koa_body__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! koa-body */ \"koa-body\");\n/* harmony import */ var koa_body__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(koa_body__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var koa_session__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! koa-session */ \"koa-session\");\n/* harmony import */ var koa_session__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(koa_session__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _middleware__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./middleware */ \"./app/middleware/index.js\");\n/* harmony import */ var _routes_web__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./routes/web */ \"./app/routes/web/index.js\");\n/* harmony import */ var _routes_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./routes/api */ \"./app/routes/api/index.js\");\n/* harmony import */ var _routes_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./routes/page */ \"./app/routes/page/index.js\");\n/* harmony import */ var koa_csrf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! koa-csrf */ \"koa-csrf\");\n/* harmony import */ var koa_csrf__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(koa_csrf__WEBPACK_IMPORTED_MODULE_7__);\n\n\n\n\n\n\n\n\n\nconst { log4js, routeLoggerMiddleware, initLoggerMiddleware } = _middleware__WEBPACK_IMPORTED_MODULE_3__[\"loggerMiddleware\"];\nconst { errorHandleMiddleware, tryCatchMiddleware } = _middleware__WEBPACK_IMPORTED_MODULE_3__[\"errorMiddleware\"];\nconst app = new koa__WEBPACK_IMPORTED_MODULE_0___default.a();\nconst appLogger = log4js.getLogger('app');\nconst errorLogger = log4js.getLogger('error');\n\napp.use(tryCatchMiddleware);\n\napp.use(initLoggerMiddleware());\n\napp.use(Object(_middleware__WEBPACK_IMPORTED_MODULE_3__[\"cacheInitMiddleware\"])());\napp.use(Object(_middleware__WEBPACK_IMPORTED_MODULE_3__[\"configMiddleware\"])(process.cwd()));\napp.use(Object(_middleware__WEBPACK_IMPORTED_MODULE_3__[\"loginMiddleware\"])());\napp.use(Object(_middleware__WEBPACK_IMPORTED_MODULE_3__[\"apiAuthMiddleware\"])());\n\napp.use(_middleware__WEBPACK_IMPORTED_MODULE_3__[\"assetMiddleware\"]);\n\n// session middleware\napp.keys = ['user logined secret'];\napp.use(koa_session__WEBPACK_IMPORTED_MODULE_2___default()({\n    key: 'koa:sess',\n    maxAge: 7200000, /** (number) maxAge in ms (default is 1 days)，cookie的过期时间，这里表示2个小时 */\n    overwrite: true, /** (boolean) can overwrite or not (default true) */\n    httpOnly: true, /** (boolean) httpOnly or not (default true) */\n    signed: true /** (boolean) signed or not (default true) */\n}, app));\n\napp.use(koa_body__WEBPACK_IMPORTED_MODULE_1__({\n    multipart: true,\n    'formLimit': '5mb',\n    'jsonLimit': '5mb',\n    'textLimit': '5mb'\n}));\n\napp.use(new koa_csrf__WEBPACK_IMPORTED_MODULE_7___default.a());\napp.use(_routes_web__WEBPACK_IMPORTED_MODULE_4__[\"default\"].routes(), _routes_web__WEBPACK_IMPORTED_MODULE_4__[\"default\"].allowedMethods());\napp.use(_routes_api__WEBPACK_IMPORTED_MODULE_5__[\"default\"].routes(), _routes_api__WEBPACK_IMPORTED_MODULE_5__[\"default\"].allowedMethods());\napp.use(_routes_page__WEBPACK_IMPORTED_MODULE_6__[\"default\"].routes(), _routes_page__WEBPACK_IMPORTED_MODULE_6__[\"default\"].allowedMethods());\n\napp.use(errorHandleMiddleware);\napp.use(routeLoggerMiddleware());\n\napp.on('error', err => {\n    errorLogger.error('server error', err);\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (app);\n\n//# sourceURL=webpack:///./app/app.js?");

/***/ }),

/***/ "./app/controllers/appController.js":
/*!******************************************!*\
  !*** ./app/controllers/appController.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./app/utils/index.js\");\n/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services */ \"./app/services/index.js\");\n\n\n\nconst packData = _utils__WEBPACK_IMPORTED_MODULE_0__[\"normalUtil\"].packData;\nconst validator = _utils__WEBPACK_IMPORTED_MODULE_0__[\"normalUtil\"].validator;\nconst redirectData = _utils__WEBPACK_IMPORTED_MODULE_0__[\"normalUtil\"].redirectData;\n\nconst create = async function (ctx) {\n    const request = ctx.request.body;\n    try {\n        const app = await _services__WEBPACK_IMPORTED_MODULE_1__[\"appService\"].create(request);\n        return packData(200, 'success', app);\n    } catch (e) {\n        ctx.logger.getLogger('error').error(e);\n        return packData(500, 'error', 'mysql-error');\n    }\n};\n\nconst findOneById = async function (ctx) {\n    const params = ctx.params;\n    try {\n        const app = await _services__WEBPACK_IMPORTED_MODULE_1__[\"appService\"].findOne({ id: params.id });\n        if (!app) {\n            return packData(404, 'error', 'data-not-find');\n        }\n        if (ctx.url.includes('/api/')) {\n            delete app.dataValues.ticket;\n        }\n        return packData(200, 'success', app);\n    } catch (e) {\n        ctx.logger.getLogger('error').error(e);\n        return packData(500, 'error', 'mysql-error');\n    }\n};\n\nconst findOneById2Login = async function (ctx) {\n    const params = ctx.params;\n    try {\n        const app = await _services__WEBPACK_IMPORTED_MODULE_1__[\"appService\"].findOne({ id: params.id.replace('fs', '') });\n        if (!app) {\n            return packData(404, 'error', 'data-not-find');\n        }\n        delete app.dataValues.ticket;\n        delete app.dataValues.id;\n        return packData(200, 'success', app);\n    } catch (e) {\n        ctx.logger.getLogger('error').error(e);\n        return packData(500, 'error', 'mysql-error');\n    }\n};\n\nconst remove = async function (ctx) {\n    const request = ctx.request.body;\n    const params = ctx.params;\n    try {\n        const app = await _services__WEBPACK_IMPORTED_MODULE_1__[\"appService\"].delete({ id: params.id });\n        return packData(200, 'success', app);\n    } catch (e) {\n        ctx.logger.getLogger('error').error(e);\n        return packData(500, 'error', 'mysql-error');\n    }\n};\n\nconst findAll = async function (ctx) {\n    const request = ctx.request.body;\n    const params = ctx.params;\n    try {\n        const apps = await _services__WEBPACK_IMPORTED_MODULE_1__[\"appService\"].findAll();\n        if (ctx.url.includes('/api/')) {\n            apps.forEach(val => {\n                delete val.dataValues.ticket;\n            });\n        }\n        return packData(200, 'success', apps);\n    } catch (e) {\n        ctx.logger.getLogger('error').error(e);\n        return packData(500, 'error', 'mysql-error');\n    }\n};\n\nconst findAllByPage = async function (ctx) {\n    const request = ctx.request.query;\n    let limit = request.limit;\n    let offset = request.offset;\n    if (validator.isEmpty(limit) || validator.isEmpty(offset)) {\n        return packData(412, 'error', 'input-invalidate-empty');\n    }\n    if (!validator.isNumeric(limit) || !validator.isNumeric(offset)) {\n        return packData(412, 'error', 'input-invalidate-number');\n    }\n    limit = Number(limit);\n    offset = Number(offset);\n    try {\n        const apps = await _services__WEBPACK_IMPORTED_MODULE_1__[\"appService\"].findAndCountAll(limit, offset, request.keyword);\n        if (ctx.url.includes('/api/')) {\n            apps.rows.forEach(val => {\n                delete val.dataValues.ticket;\n            });\n        }\n        return packData(200, 'success', apps);\n    } catch (e) {\n        ctx.logger.getLogger('error').error(e);\n        return packData(500, 'error', 'mysql-error');\n    }\n};\n\nconst update = async function (ctx) {\n    const request = ctx.request.body;\n    const params = ctx.params;\n    const id = params.id;\n    try {\n        const app = await _services__WEBPACK_IMPORTED_MODULE_1__[\"appService\"].update(request, { id });\n        return packData(200, 'success', app);\n    } catch (e) {\n        ctx.logger.getLogger('error').error(e);\n        return packData(500, 'error', 'mysql-error');\n    }\n};\n\nconst gotoApp = async function (ctx) {\n    const query = ctx.request.query;\n    const redirect_url = query.redirect_url;\n    if (!redirect_url) {\n        return redirectData(412, '/error', 'input-invalidate-empty');\n    }\n    const tmpToken = await _services__WEBPACK_IMPORTED_MODULE_1__[\"accessTokenService\"].refreshTmpToken(ctx, ctx.session.user.id);\n    return redirectData(302, `${redirect_url}?access_token=${tmpToken}`);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n    create, findOneById, update, remove, findAll, findAllByPage,\n    findOneById2Login, gotoApp\n});\n\n//# sourceURL=webpack:///./app/controllers/appController.js?");

/***/ }),

/***/ "./app/controllers/imageController.js":
/*!********************************************!*\
  !*** ./app/controllers/imageController.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./app/utils/index.js\");\n/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services */ \"./app/services/index.js\");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ \"moment\");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nconst packData = _utils__WEBPACK_IMPORTED_MODULE_0__[\"normalUtil\"].packData;\nconst validator = _utils__WEBPACK_IMPORTED_MODULE_0__[\"normalUtil\"].validator;\n\nconst create = async function (ctx, file) {\n    const request = ctx.request.body;\n    request.path = file.path;\n    request.mime = file.type;\n    request.name = file.name;\n    request.size = file.size;\n    request.name = file.name;\n    try {\n        request.date = moment__WEBPACK_IMPORTED_MODULE_2___default()().unix();\n        const image = await _services__WEBPACK_IMPORTED_MODULE_1__[\"imageService\"].create(request);\n        return packData(200, 'success', image);\n    } catch (e) {\n        console.log(e);\n        ctx.logger.getLogger('error').error(e);\n        return packData(500, 'error', 'mysql-error');\n    }\n};\n\nconst findOneById = async function (ctx) {\n    const request = ctx.request.body;\n    const params = ctx.params;\n    try {\n        const image = await _services__WEBPACK_IMPORTED_MODULE_1__[\"imageService\"].findOne({ id: params.id });\n        if (!image) {\n            return packData(404, 'error', 'data-not-find');\n        }\n        return packData(200, 'success', image);\n    } catch (e) {\n        ctx.logger.getLogger('error').error(e);\n        return packData(500, 'error', 'mysql-error');\n    }\n};\n\nconst remove = async function (ctx) {\n    const request = ctx.request.body;\n    const params = ctx.params;\n    try {\n        const image = await _services__WEBPACK_IMPORTED_MODULE_1__[\"imageService\"].delete({ id: params.id });\n        return packData(200, 'success', image);\n    } catch (e) {\n        ctx.logger.getLogger('error').error(e);\n        return packData(500, 'error', 'mysql-error');\n    }\n};\n\nconst findAll = async function (ctx) {\n    const request = ctx.request.body;\n    const params = ctx.params;\n    try {\n        const images = await _services__WEBPACK_IMPORTED_MODULE_1__[\"imageService\"].findAll();\n        const result = packData(200, 'success', images);\n        result.data.list = result.data.list.map(v => {\n            v.url = `${ctx.origin}/web/image/view/${v.id}`;\n            delete v.path;\n            return v;\n        });\n        return result;\n    } catch (e) {\n        ctx.logger.getLogger('error').error(e);\n        return packData(500, 'error', 'mysql-error');\n    }\n};\n\nconst findAllByPage = async function (ctx) {\n    const request = ctx.request.body;\n    let limit = request.limit;\n    let offset = request.offset;\n    if (validator.isEmpty(limit) || validator.isEmpty(offset)) {\n        return packData(412, 'error', 'input-invalidate-empty');\n    }\n    if (!validator.isNumeric(limit) || !validator.isNumeric(offset)) {\n        return packData(412, 'error', 'input-invalidate-number');\n    }\n    limit = Number(limit);\n    offset = Number(offset);\n    try {\n        const images = await _services__WEBPACK_IMPORTED_MODULE_1__[\"imageService\"].findAndCountAll(limit, offset, request.keyword);\n        const result = packData(200, 'success', images);\n        result.data.list = result.data.list.map(v => {\n            v.url = `${ctx.origin}/web/image/view/${v.id}`;\n            delete v.path;\n            return v;\n        });\n        return result;\n    } catch (e) {\n        ctx.logger.getLogger('error').error(e);\n        return packData(500, 'error', 'mysql-error');\n    }\n};\n\nconst update = async function (ctx) {\n    const request = ctx.request.body;\n    const params = ctx.params;\n    const id = params.id;\n    try {\n        const image = await _services__WEBPACK_IMPORTED_MODULE_1__[\"imageService\"].update(request, { id });\n        return packData(200, 'success', image);\n    } catch (e) {\n        ctx.logger.getLogger('error').error(e);\n        return packData(500, 'error', 'mysql-error');\n    }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n    create, findOneById, update, remove, findAll, findAllByPage\n});\n\n//# sourceURL=webpack:///./app/controllers/imageController.js?");

/***/ }),

/***/ "./app/controllers/index.js":
/*!**********************************!*\
  !*** ./app/controllers/index.js ***!
  \**********************************/
/*! exports provided: appController, imageController, userController, userAppController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _appController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./appController */ \"./app/controllers/appController.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"appController\", function() { return _appController__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _imageController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./imageController */ \"./app/controllers/imageController.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"imageController\", function() { return _imageController__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony import */ var _userController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./userController */ \"./app/controllers/userController.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"userController\", function() { return _userController__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; });\n\n/* harmony import */ var _userAppController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./userAppController */ \"./app/controllers/userAppController.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"userAppController\", function() { return _userAppController__WEBPACK_IMPORTED_MODULE_3__[\"default\"]; });\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./app/controllers/index.js?");

/***/ }),

/***/ "./app/controllers/userAppController.js":
/*!**********************************************!*\
  !*** ./app/controllers/userAppController.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./app/utils/index.js\");\n/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services */ \"./app/services/index.js\");\n/* harmony import */ var md5__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! md5 */ \"md5\");\n/* harmony import */ var md5__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(md5__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nconst packData = _utils__WEBPACK_IMPORTED_MODULE_0__[\"normalUtil\"].packData;\nconst validator = _utils__WEBPACK_IMPORTED_MODULE_0__[\"normalUtil\"].validator;\n\nconst getUserApps = async function (ctx) {\n    const user = ctx.session.user;\n    if (!user) {\n        return packData(401, 'error', 'no-logined');\n    }\n    try {\n        const userApps = await _services__WEBPACK_IMPORTED_MODULE_1__[\"userAppService\"].findAll({ uid: user.id });\n        const allApps = await _services__WEBPACK_IMPORTED_MODULE_1__[\"appService\"].findAll();\n        return packData(200, 'success', {\n            userApps,\n            allApps\n        });\n    } catch (e) {\n        ctx.logger.getLogger('error').error(e);\n        return packData(500, 'error', 'mysql-error');\n    }\n};\n\nconst updateUserApp = async function (ctx) {\n    const user = ctx.session.user;\n    const params = ctx.params;\n    const query = ctx.request.body;\n    if (!user) {\n        return packData(401, 'error', 'no-logined');\n    }\n    try {\n        const appid = params.appId;\n        const uid = user.id;\n        const status = query.status || 0;\n        const userApp = await _services__WEBPACK_IMPORTED_MODULE_1__[\"userAppService\"].update({ status }, {\n            uid, appid\n        });\n        return packData(200, 'success', userApp);\n    } catch (e) {\n        console.log(e);\n        ctx.logger.getLogger('error').error(e);\n        return packData(500, 'error', 'mysql-error');\n    }\n};\n\nconst create = async function (ctx) {\n    try {\n        const request = ctx.request.body;\n        const isHasUserApp = await _services__WEBPACK_IMPORTED_MODULE_1__[\"userAppService\"].findOne({\n            appid: request.appid,\n            uid: request.uid\n        });\n        if (isHasUserApp) {\n            return packData(412, 'error', 'data-is-exist');\n        }\n        const user = await _services__WEBPACK_IMPORTED_MODULE_1__[\"userService\"].findOne({ id: request.uid });\n        const app = await _services__WEBPACK_IMPORTED_MODULE_1__[\"appService\"].findOne({ id: request.appid });\n        if (!user || !app) {\n            return packData(403, 'error', 'data-not-find');\n        }\n        const userApp = await user.addApp(app, { through: { status: 1 } });\n        return packData(200, 'success', null);\n    } catch (e) {\n        ctx.logger.getLogger('error').error(e);\n        return packData(500, 'error', 'mysql-error');\n    }\n};\n\nconst remove = async function (ctx) {\n    const params = ctx.params;\n    try {\n        const auth = await _services__WEBPACK_IMPORTED_MODULE_1__[\"userAppService\"].delete({\n            appid: params.appid,\n            uid: params.uid\n        });\n        return packData(200, 'success', auth);\n    } catch (e) {\n        ctx.logger.getLogger('error').error(e);\n        return packData(500, 'error', 'mysql-error');\n    }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n    getUserApps,\n    create,\n    remove,\n    updateUserApp\n});\n\n//# sourceURL=webpack:///./app/controllers/userAppController.js?");

/***/ }),

/***/ "./app/controllers/userController.js":
/*!*******************************************!*\
  !*** ./app/controllers/userController.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./app/utils/index.js\");\n/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services */ \"./app/services/index.js\");\n/* harmony import */ var md5__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! md5 */ \"md5\");\n/* harmony import */ var md5__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(md5__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nconst packData = _utils__WEBPACK_IMPORTED_MODULE_0__[\"normalUtil\"].packData;\nconst validator = _utils__WEBPACK_IMPORTED_MODULE_0__[\"normalUtil\"].validator;\nconst deepClone = _utils__WEBPACK_IMPORTED_MODULE_0__[\"normalUtil\"].deepClone;\nconst redirectData = _utils__WEBPACK_IMPORTED_MODULE_0__[\"normalUtil\"].redirectData;\n\nconst userInfo = async function (ctx) {\n    const request = ctx.request.body;\n    const tmpToken = request.access_token;\n    if (!tmpToken) {\n        return packData(412, 'error', 'access-token-empty');\n    }\n    const uid = ctx.cache.pull(tmpToken);\n    if (!uid) {\n        return packData(412, 'error', 'access-token-expired');\n    }\n    return packData(200, 'success', (await _services__WEBPACK_IMPORTED_MODULE_1__[\"userService\"].findOne({ id: uid })));\n};\n\nconst logined = async function (ctx) {\n    const request = ctx.request.body;\n    if (!ctx.session.user) {\n        return redirectData(401, '/error', 'no-logined');\n    }\n    // const token = await accessTokenService.generateRefreshToken(user.dataValues.id);\n    try {\n        if (request.appid) {\n            const app = await _services__WEBPACK_IMPORTED_MODULE_1__[\"appService\"].findOne({ id: request.appid.replace('fs', '') });\n            if (!app.dataValues.id) {\n                return redirectData(404, '/error', 'data-not-find');\n            }\n            const tmpToken = await _services__WEBPACK_IMPORTED_MODULE_1__[\"accessTokenService\"].refreshTmpToken(ctx, ctx.session.user.id);\n            return redirectData(302, `${app.url}?access_token=${tmpToken}`);\n        } else {\n            return redirectData(412, '/error', 'input-invalidate-empty');\n        }\n    } catch (e) {\n        console.log(e);\n        ctx.logger.getLogger('error').error(e);\n        return redirectData(500, '/error', 'mysql-error');\n    }\n};\n\nconst checkLogin = async function (ctx) {\n    const request = ctx.request.body;\n    const account = request.account;\n    const appid = (request.appid || '').replace('fs', '');\n    let password = request.password;\n    if (validator.isEmpty(password) || validator.isEmpty(account)) {\n        return packData(412, 'error', 'input-invalidate-empty');\n    }\n    password = md5__WEBPACK_IMPORTED_MODULE_2___default()(password);\n    try {\n        const user = await _services__WEBPACK_IMPORTED_MODULE_1__[\"userService\"].findOne({ account });\n        if (user && user.password === password) {\n            let isAuth = false;\n            if (appid) {\n                let apps = await user.getApp();\n                apps = deepClone(apps);\n                const appIds = apps.map(val => {\n                    return {\n                        id: val.id,\n                        status: val.uc_user_app.status\n                    };\n                });\n                isAuth = !!appIds.filter(v => Number(v.id) === Number(appid) && v.status).length;\n            }\n            if (appid && !isAuth) {\n                return packData(403, 'error', 'no-auth-app');\n            }\n            delete user.dataValues.password;\n            ctx.session.user = user;\n            return packData(200, 'success', { user });\n        } else {\n            return packData(401.1, 'error', 'login-invalidate');\n        }\n    } catch (e) {\n        console.log(e);\n        ctx.logger.getLogger('error').error(e);\n        return packData(500, 'error', 'mysql-error');\n    }\n};\n\nconst create = async function (ctx) {\n    try {\n        const request = ctx.request.body;\n        const currentUser = await _services__WEBPACK_IMPORTED_MODULE_1__[\"userService\"].findOne({ account: request.account });\n        if (currentUser && currentUser.dataValues.id) {\n            return packData(403, 'error', 'user-exist');\n        }\n        if (!request.password) {\n            request.password = md5__WEBPACK_IMPORTED_MODULE_2___default()('Koauc123#');\n        }\n        const user = await _services__WEBPACK_IMPORTED_MODULE_1__[\"userService\"].create(request);\n\n        return packData(200, 'success', user);\n    } catch (e) {\n        ctx.logger.getLogger('error').error(e);\n        return packData(500, 'error', 'mysql-error');\n    }\n};\n\nconst findAllByPage = async function (ctx) {\n    const request = ctx.request.query;\n    let limit = request.limit;\n    let offset = request.offset;\n    if (validator.isEmpty(limit) || validator.isEmpty(offset)) {\n        return packData(412, 'error', 'input-invalidate-empty');\n    }\n    if (!validator.isNumeric(limit) || !validator.isNumeric(offset)) {\n        return packData(412, 'error', 'input-invalidate-number');\n    }\n    limit = Number(limit);\n    offset = Number(offset);\n    try {\n        const users = await _services__WEBPACK_IMPORTED_MODULE_1__[\"userService\"].findAndCountAll(limit, offset, request.keyword, request.includes);\n        return packData(200, 'success', users);\n    } catch (e) {\n        ctx.logger.getLogger('error').error(e);\n        return packData(500, 'error', 'mysql-error');\n    }\n};\n\nconst findUserByLoginId = async function (ctx) {\n    const user = ctx.session.user;\n    let account = null;\n    if (user) {\n        account = user.account;\n    } else {\n        account = ctx.request.params.account;\n    }\n    if (!account) {\n        return packData(412, 'error', 'input-invalidate-empty');\n    }\n    try {\n        const user = await _services__WEBPACK_IMPORTED_MODULE_1__[\"userService\"].findOne({ account });\n        if (user) {\n            delete user.dataValues.password;\n        }\n        return packData(200, 'success', user);\n    } catch (e) {\n        ctx.logger.getLogger('error').error(e);\n        return packData(500, 'error', 'mysql-error');\n    }\n};\n\nconst updateUser = async function (ctx) {\n    const request = ctx.request.body;\n    const id = request.id;\n    if (!id) {\n        return packData(412, 'error', 'input-invalidate-empty');\n    }\n    try {\n        delete request.password;\n        delete request.account;\n        delete request.id;\n        const user = await _services__WEBPACK_IMPORTED_MODULE_1__[\"userService\"].update(request, { id });\n        return packData(200, 'success', user);\n    } catch (e) {\n        ctx.logger.getLogger('error').error(e);\n        return packData(500, 'error', 'mysql-error');\n    }\n};\n\nconst updatePwd = async function (ctx) {\n    const request = ctx.request.body;\n    const user = ctx.session.user;\n    const id = user.id;\n    const oldPwd = md5__WEBPACK_IMPORTED_MODULE_2___default()(request.oldPassword);\n    const newPwd = md5__WEBPACK_IMPORTED_MODULE_2___default()(request.newPassword);\n\n    if (!oldPwd || !newPwd) {\n        return packData(412, 'error', 'input-invalidate-empty');\n    }\n\n    try {\n        const user = await _services__WEBPACK_IMPORTED_MODULE_1__[\"userService\"].findOne({ id });\n        if (user.password === oldPwd) {\n            const result = await _services__WEBPACK_IMPORTED_MODULE_1__[\"userService\"].update({ password: newPwd }, { id });\n            return packData(200, 'success', result);\n        } else {\n            return packData(412, 'error', 'input-invalidate-oldPwd');\n        }\n    } catch (e) {\n        ctx.logger.getLogger('error').error(e);\n        return packData(500, 'error', 'mysql-error');\n    }\n};\n\nconst logout = async function (ctx) {\n    ctx.session.user = null;\n    // const act = ctx.request.body.access_token || ctx.header.access_token;\n    // accessTokenService.remove();\n    return packData(200, 'success', {});\n};\n\nconst remove = async function (ctx) {\n    const request = ctx.request.body;\n    const params = ctx.params;\n    try {\n        const user = await _services__WEBPACK_IMPORTED_MODULE_1__[\"userService\"].findOne({ id: params.id });\n        if (user.dataValues.account === 'fishelly.') {\n            return packData(403, 'error', 'can-not-delete-fishelly');\n        }\n        const image = await _services__WEBPACK_IMPORTED_MODULE_1__[\"userService\"].delete({ id: params.id });\n        return packData(200, 'success', image);\n    } catch (e) {\n        ctx.logger.getLogger('error').error(e);\n        return packData(500, 'error', 'mysql-error');\n    }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n    logined,\n    checkLogin,\n    create,\n    updateUser,\n    findUserByLoginId,\n    updatePwd,\n    logout,\n    userInfo,\n    remove,\n    findAllByPage\n});\n\n//# sourceURL=webpack:///./app/controllers/userController.js?");

/***/ }),

/***/ "./app/middleware/apiAuthMiddleware.js":
/*!*********************************************!*\
  !*** ./app/middleware/apiAuthMiddleware.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./app/utils/index.js\");\n/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services */ \"./app/services/index.js\");\n/* harmony import */ var md5__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! md5 */ \"md5\");\n/* harmony import */ var md5__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(md5__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ \"moment\");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\nconst packData = _utils__WEBPACK_IMPORTED_MODULE_0__[\"normalUtil\"].packData;\nconst notAllowed = ['/api/'];\n\nfunction isNotIgnore(url) {\n    return !url.includes('ignore') && notAllowed.filter(val => url.includes(val)).length > 0;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n    return async function (ctx, next) {\n        let url = ctx.url;\n        if (isNotIgnore(url)) {\n            const isAuth = await checkAuth(ctx);\n            if (!isAuth.result) {\n                return false;\n            }\n        }\n        await next();\n    };\n});;\n\nasync function checkAuth(ctx) {\n    let request = {};\n    if (ctx.method === 'GET') {\n        request = ctx.request.query;\n    } else {\n        request = ctx.request.body;\n    }\n    const token = request.token;\n    const time = request.time;\n    const curTime = moment__WEBPACK_IMPORTED_MODULE_3___default()().unix();\n    const appid = (request.appid || '').trim();\n\n    if (!token || !time || !appid) {\n        return {\n            result: false,\n            data: packData(412, 'error', 'input-invalidate-empty')\n        };\n    }\n    if (curTime - time > 60 * 50) {\n        return {\n            result: false,\n            data: packData(403, 'error', 'expired-time')\n        };\n    }\n    const app = await _services__WEBPACK_IMPORTED_MODULE_1__[\"appService\"].findOne({ id: appid.replace('fs', '') });\n    if (!app) {\n        return {\n            result: false,\n            data: packData(404, 'error', 'data-not-find')\n        };\n    }\n    const ticket = app.ticket;\n    const appToken = md5__WEBPACK_IMPORTED_MODULE_2___default()(`${ticket}${appid}${time}`);\n    return {\n        result: appToken === token\n    };\n}\n\n//# sourceURL=webpack:///./app/middleware/apiAuthMiddleware.js?");

/***/ }),

/***/ "./app/middleware/assetMiddleware.js":
/*!*******************************************!*\
  !*** ./app/middleware/assetMiddleware.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var koa_send__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-send */ \"koa-send\");\n/* harmony import */ var koa_send__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_send__WEBPACK_IMPORTED_MODULE_0__);\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (async function (ctx, next) {\n    const url = ctx.request.url;\n    if (url.includes('/public/')) {\n        ctx.set('Service-Worker-Allowed', '/');\n        await koa_send__WEBPACK_IMPORTED_MODULE_0___default()(ctx, ctx.path, {\n            root: `${ctx._dir_path}`,\n            maxage: 365 * 24 * 60 * 60 * 1000 * 1000\n        });\n    } else {\n        await next();\n    }\n});\n\n//# sourceURL=webpack:///./app/middleware/assetMiddleware.js?");

/***/ }),

/***/ "./app/middleware/cacheInitMiddleware.js":
/*!***********************************************!*\
  !*** ./app/middleware/cacheInitMiddleware.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./app/utils/index.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n    const cache = new _utils__WEBPACK_IMPORTED_MODULE_0__[\"Cache\"]();\n    return async function (ctx, next) {\n        ctx.cache = cache;\n        await next();\n    };\n});;\n\n//# sourceURL=webpack:///./app/middleware/cacheInitMiddleware.js?");

/***/ }),

/***/ "./app/middleware/configMiddleware.js":
/*!********************************************!*\
  !*** ./app/middleware/configMiddleware.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _config_server_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config/server.config */ \"./config/server.config.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (_dirname) {\n    return async (ctx, next) => {\n        ctx._dir_path = _dirname;\n        ctx._server_config = _config_server_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n        await next();\n    };\n});\n\n//# sourceURL=webpack:///./app/middleware/configMiddleware.js?");

/***/ }),

/***/ "./app/middleware/errorMiddleware.js":
/*!*******************************************!*\
  !*** ./app/middleware/errorMiddleware.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nlet template = null;\nif (!template) {\n    template = Object(fs__WEBPACK_IMPORTED_MODULE_0__[\"readFileSync\"])(Object(path__WEBPACK_IMPORTED_MODULE_1__[\"join\"])(process.cwd(), 'public/error', 'index.html')).toString();\n}\n\nfunction renderError(obj) {\n    return async function (ctx, next) {\n        ctx.type = 'html';\n        ctx.body = template.replace('${TITLE}', obj.title).replace('${MSG}', obj.msg);\n    };\n}\n\nasync function tryCatchMiddleware(ctx, next) {\n    try {\n        await next();\n    } catch (e) {\n        ctx.status = e.status || 500;\n        await errorHandleMiddleware(ctx);\n        //触发 koa 统一错误事件，可以打印出详细的错误堆栈 log\n        if (ctx.status === 500) {\n            ctx.app.emit('error', e, ctx);\n        }\n    }\n}\n\nasync function errorHandleMiddleware(ctx, next) {\n    let handle = null;\n    let status = ctx.status;\n    // 根据 status 渲染不同的页面\n    if (status === 403) {\n        switch (ctx.accepts('html', 'json')) {\n            case 'html':\n                handle = renderError({ title: '403 未授权.', msg: '403！抱歉，您没有访问权限~~' });\n                await handle(ctx);\n                break;\n            case 'json':\n                ctx.status = 200;\n                ctx.body = {\n                    code: 403,\n                    status: 'error',\n                    msg: 'CSRF TOKEN或其他TOKEN不匹配'\n                };\n                break;\n            default:\n                ctx.type = 'text';\n                ctx.body = 'CSRF TOKEN或其他TOKEN不匹配';\n        }\n    } else if (ctx.status === 404) {\n        ctx.status = 404;\n        switch (ctx.accepts('html', 'json')) {\n            case 'html':\n                handle = renderError({ title: '404 您访问的页面不存在.', msg: '404！抱歉，您查看的页面不存在～～' });\n                await handle(ctx);\n                break;\n            case 'json':\n                ctx.status = 200;\n                ctx.body = {\n                    code: 404,\n                    status: 'error',\n                    msg: '您访问的页面不存在'\n                };\n                break;\n            default:\n                ctx.type = 'text';\n                ctx.body = 'Page Not Found';\n        }\n    } else if (status === 500) {\n        switch (ctx.accepts('html', 'json')) {\n            case 'html':\n                handle = renderError({ title: '500 服务器出错.', msg: '500！抱歉，服务器出错，请稍后再访问～～' });\n                await handle(ctx);\n                break;\n            case 'json':\n                ctx.status = 200;\n                ctx.body = {\n                    code: 500,\n                    status: 'error',\n                    msg: '服务器出错'\n                };\n                break;\n            default:\n                ctx.type = 'text';\n                ctx.body = '服务器出错';\n        }\n    }\n    next && next();\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n    tryCatchMiddleware, errorHandleMiddleware\n});\n\n//# sourceURL=webpack:///./app/middleware/errorMiddleware.js?");

/***/ }),

/***/ "./app/middleware/index.js":
/*!*********************************!*\
  !*** ./app/middleware/index.js ***!
  \*********************************/
/*! exports provided: cacheInitMiddleware, configMiddleware, loggerMiddleware, loginMiddleware, apiAuthMiddleware, errorMiddleware, assetMiddleware */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _configMiddleware__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./configMiddleware */ \"./app/middleware/configMiddleware.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"configMiddleware\", function() { return _configMiddleware__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _loggerMiddleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loggerMiddleware */ \"./app/middleware/loggerMiddleware.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"loggerMiddleware\", function() { return _loggerMiddleware__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony import */ var _loginMiddleware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loginMiddleware */ \"./app/middleware/loginMiddleware.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"loginMiddleware\", function() { return _loginMiddleware__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; });\n\n/* harmony import */ var _cacheInitMiddleware__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cacheInitMiddleware */ \"./app/middleware/cacheInitMiddleware.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"cacheInitMiddleware\", function() { return _cacheInitMiddleware__WEBPACK_IMPORTED_MODULE_3__[\"default\"]; });\n\n/* harmony import */ var _apiAuthMiddleware__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./apiAuthMiddleware */ \"./app/middleware/apiAuthMiddleware.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"apiAuthMiddleware\", function() { return _apiAuthMiddleware__WEBPACK_IMPORTED_MODULE_4__[\"default\"]; });\n\n/* harmony import */ var _errorMiddleware__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./errorMiddleware */ \"./app/middleware/errorMiddleware.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"errorMiddleware\", function() { return _errorMiddleware__WEBPACK_IMPORTED_MODULE_5__[\"default\"]; });\n\n/* harmony import */ var _assetMiddleware__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./assetMiddleware */ \"./app/middleware/assetMiddleware.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"assetMiddleware\", function() { return _assetMiddleware__WEBPACK_IMPORTED_MODULE_6__[\"default\"]; });\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./app/middleware/index.js?");

/***/ }),

/***/ "./app/middleware/loggerMiddleware.js":
/*!********************************************!*\
  !*** ./app/middleware/loggerMiddleware.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _config_server_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config/server.config */ \"./config/server.config.js\");\n/* harmony import */ var koa_log4__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! koa-log4 */ \"koa-log4\");\n/* harmony import */ var koa_log4__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(koa_log4__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nkoa_log4__WEBPACK_IMPORTED_MODULE_1___default.a.configure(_config_server_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].log);\n\nfunction routeLoggerMiddleware() {\n    return async function (ctx, next) {\n        const start = new Date();\n        ctx.logger = koa_log4__WEBPACK_IMPORTED_MODULE_1___default.a;\n        await next();\n        const ms = new Date() - start;\n        koa_log4__WEBPACK_IMPORTED_MODULE_1___default.a.getLogger('app').info(`${ctx.method} ${ctx.url} - ${ms}ms`);\n    };\n}\n\nconst DEFAULT_FORMAT = ':remote-addr - -' + ' \":method :url HTTP/:http-version\"' + ' :status :content-length \":referrer\"' + ' \":user-agent\"' + ' \"time： :response-time\"';\n\nfunction initLoggerMiddleware() {\n    return koa_log4__WEBPACK_IMPORTED_MODULE_1___default.a.koaLogger(koa_log4__WEBPACK_IMPORTED_MODULE_1___default.a.getLogger('http'), {\n        level: 'auto',\n        format: DEFAULT_FORMAT\n    });\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n    log4js: (koa_log4__WEBPACK_IMPORTED_MODULE_1___default()),\n    routeLoggerMiddleware,\n    initLoggerMiddleware\n});\n\n//# sourceURL=webpack:///./app/middleware/loggerMiddleware.js?");

/***/ }),

/***/ "./app/middleware/loginMiddleware.js":
/*!*******************************************!*\
  !*** ./app/middleware/loginMiddleware.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./app/utils/index.js\");\n/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services */ \"./app/services/index.js\");\n\n\n\nconst packData = _utils__WEBPACK_IMPORTED_MODULE_0__[\"normalUtil\"].packData;\nconst notAllowed = ['/web/'];\nconst ignoreArray = ['/ignore', '/login'];\n\nfunction isNotIgnore(url) {\n    return !ignoreArray.filter(val => !url.includes(val)).length && notAllowed.filter(val => url.includes(val)).length > 0;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n    return async function (ctx, next) {\n        let url = ctx.url;\n        const isAuth = await checkAuth(ctx);\n        if (isNotIgnore(url) && !isAuth) {\n            ctx.body = packData(401, 'error', 'no-logined');\n            return false;\n        }\n        await next();\n    };\n});;\n\nasync function checkAuth(ctx) {\n    const accessToken = ctx.header.access_token;\n    const user = ctx.session.user;\n    let uid = null;\n    if (!accessToken && user) {\n        uid = user.id;\n    } else if (accessToken) {\n        uid = await _services__WEBPACK_IMPORTED_MODULE_1__[\"accessTokenService\"].getAccessTokenRelatedUID(accessToken);\n    }\n    return !!uid;\n}\n\n//# sourceURL=webpack:///./app/middleware/loginMiddleware.js?");

/***/ }),

/***/ "./app/models/access_token.js":
/*!************************************!*\
  !*** ./app/models/access_token.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./db */ \"./app/models/db.js\");\n/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sequelize */ \"sequelize\");\n/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sequelize__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconst AccessToken = _db__WEBPACK_IMPORTED_MODULE_0__[\"default\"].define('uc_access_token', {\n    id: { type: sequelize__WEBPACK_IMPORTED_MODULE_1___default.a.BIGINT, primaryKey: true, autoIncrement: true },\n    uid: { type: sequelize__WEBPACK_IMPORTED_MODULE_1___default.a.BIGINT },\n    access_token: { type: sequelize__WEBPACK_IMPORTED_MODULE_1___default.a.STRING(256), allowNull: false },\n    refresh_token: { type: sequelize__WEBPACK_IMPORTED_MODULE_1___default.a.STRING(256), allowNull: false },\n    expired_time: { type: sequelize__WEBPACK_IMPORTED_MODULE_1___default.a.BIGINT, allowNull: false }\n}, {\n    tableName: 'uc_access_token',\n    timestamps: true,\n    freezeTableName: true\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (AccessToken);\n\n//# sourceURL=webpack:///./app/models/access_token.js?");

/***/ }),

/***/ "./app/models/app.js":
/*!***************************!*\
  !*** ./app/models/app.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./db */ \"./app/models/db.js\");\n/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sequelize */ \"sequelize\");\n/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sequelize__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconst App = _db__WEBPACK_IMPORTED_MODULE_0__[\"default\"].define('uc_app', {\n    id: { type: sequelize__WEBPACK_IMPORTED_MODULE_1___default.a.BIGINT, primaryKey: true, autoIncrement: true },\n    name: { type: sequelize__WEBPACK_IMPORTED_MODULE_1___default.a.STRING(256), allowNull: false },\n    url: { type: sequelize__WEBPACK_IMPORTED_MODULE_1___default.a.STRING(256), allowNull: false },\n    icon: { type: sequelize__WEBPACK_IMPORTED_MODULE_1___default.a.STRING(256) },\n    ticket: { type: sequelize__WEBPACK_IMPORTED_MODULE_1___default.a.STRING(256), allowNull: false }\n}, {\n    tableName: 'uc_app',\n    timestamps: true,\n    freezeTableName: true\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (App);\n\n//# sourceURL=webpack:///./app/models/app.js?");

/***/ }),

/***/ "./app/models/db.js":
/*!**************************!*\
  !*** ./app/models/db.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _config_database_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config/database.config */ \"./config/database.config.js\");\n/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sequelize */ \"sequelize\");\n/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sequelize__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconst mysql = new sequelize__WEBPACK_IMPORTED_MODULE_1___default.a(_config_database_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].dbname, _config_database_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].username, _config_database_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].password, _config_database_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (mysql);\n\n//# sourceURL=webpack:///./app/models/db.js?");

/***/ }),

/***/ "./app/models/image.js":
/*!*****************************!*\
  !*** ./app/models/image.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./db */ \"./app/models/db.js\");\n/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sequelize */ \"sequelize\");\n/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sequelize__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconst Image = _db__WEBPACK_IMPORTED_MODULE_0__[\"default\"].define('uc_image', {\n    id: { type: sequelize__WEBPACK_IMPORTED_MODULE_1___default.a.BIGINT, primaryKey: true, autoIncrement: true },\n    name: { type: sequelize__WEBPACK_IMPORTED_MODULE_1___default.a.STRING, allowNull: false },\n    ext: { type: sequelize__WEBPACK_IMPORTED_MODULE_1___default.a.STRING, allowNull: false },\n    mime: { type: sequelize__WEBPACK_IMPORTED_MODULE_1___default.a.STRING, allowNull: false },\n    path: { type: sequelize__WEBPACK_IMPORTED_MODULE_1___default.a.STRING, allowNull: false },\n    size: { type: sequelize__WEBPACK_IMPORTED_MODULE_1___default.a.INTEGER, allowNull: false },\n    date: { type: sequelize__WEBPACK_IMPORTED_MODULE_1___default.a.BIGINT, allowNull: false }\n}, {\n    tableName: 'uc_image',\n    timestamps: true,\n    freezeTableName: true\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Image);\n\n//# sourceURL=webpack:///./app/models/image.js?");

/***/ }),

/***/ "./app/models/index.js":
/*!*****************************!*\
  !*** ./app/models/index.js ***!
  \*****************************/
/*! exports provided: access_token, app, user, image, userApp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _access_token__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./access_token */ \"./app/models/access_token.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"access_token\", function() { return _access_token__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app */ \"./app/models/app.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"app\", function() { return _app__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user */ \"./app/models/user.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"user\", function() { return _user__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; });\n\n/* harmony import */ var _image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./image */ \"./app/models/image.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"image\", function() { return _image__WEBPACK_IMPORTED_MODULE_3__[\"default\"]; });\n\n/* harmony import */ var _user_app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./user_app */ \"./app/models/user_app.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"userApp\", function() { return _user_app__WEBPACK_IMPORTED_MODULE_4__[\"default\"]; });\n\n\n\n\n\n\n\n_user__WEBPACK_IMPORTED_MODULE_2__[\"default\"].belongsToMany(_app__WEBPACK_IMPORTED_MODULE_1__[\"default\"], { as: 'app', through: _user_app__WEBPACK_IMPORTED_MODULE_4__[\"default\"], foreignKey: 'uid' });\n_app__WEBPACK_IMPORTED_MODULE_1__[\"default\"].belongsToMany(_user__WEBPACK_IMPORTED_MODULE_2__[\"default\"], { as: 'user', through: _user_app__WEBPACK_IMPORTED_MODULE_4__[\"default\"], foreignKey: 'appid' });\n\n\n\n//# sourceURL=webpack:///./app/models/index.js?");

/***/ }),

/***/ "./app/models/user.js":
/*!****************************!*\
  !*** ./app/models/user.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./db */ \"./app/models/db.js\");\n/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sequelize */ \"sequelize\");\n/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sequelize__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconst User = _db__WEBPACK_IMPORTED_MODULE_0__[\"default\"].define('uc_user', {\n    id: { type: sequelize__WEBPACK_IMPORTED_MODULE_1___default.a.BIGINT, primaryKey: true, autoIncrement: true },\n    account: { type: sequelize__WEBPACK_IMPORTED_MODULE_1___default.a.STRING(256), allowNull: false },\n    name: { type: sequelize__WEBPACK_IMPORTED_MODULE_1___default.a.STRING(256), allowNull: true },\n    position: { type: sequelize__WEBPACK_IMPORTED_MODULE_1___default.a.STRING(256), allowNull: true },\n    signature: { type: sequelize__WEBPACK_IMPORTED_MODULE_1___default.a.STRING(256), allowNull: true },\n    label: { type: sequelize__WEBPACK_IMPORTED_MODULE_1___default.a.STRING(256), allowNull: true },\n    introduce: { type: sequelize__WEBPACK_IMPORTED_MODULE_1___default.a.TEXT, allowNull: true },\n    password: { type: sequelize__WEBPACK_IMPORTED_MODULE_1___default.a.TEXT, allowNull: false },\n    headImg: { type: sequelize__WEBPACK_IMPORTED_MODULE_1___default.a.INTEGER, allowNull: true }\n}, {\n    tableName: 'uc_user',\n    timestamps: true,\n    freezeTableName: true\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (User);\n\n//# sourceURL=webpack:///./app/models/user.js?");

/***/ }),

/***/ "./app/models/user_app.js":
/*!********************************!*\
  !*** ./app/models/user_app.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./db */ \"./app/models/db.js\");\n/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sequelize */ \"sequelize\");\n/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sequelize__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconst UserApp = _db__WEBPACK_IMPORTED_MODULE_0__[\"default\"].define('uc_user_app', {\n    appid: { type: sequelize__WEBPACK_IMPORTED_MODULE_1___default.a.BIGINT, primaryKey: true },\n    uid: { type: sequelize__WEBPACK_IMPORTED_MODULE_1___default.a.BIGINT, primaryKey: true },\n    status: { type: sequelize__WEBPACK_IMPORTED_MODULE_1___default.a.INTEGER }\n}, {\n    tableName: 'uc_user_app',\n    timestamps: true,\n    freezeTableName: true\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (UserApp);\n\n//# sourceURL=webpack:///./app/models/user_app.js?");

/***/ }),

/***/ "./app/routes/api/app.js":
/*!*******************************!*\
  !*** ./app/routes/api/app.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ \"koa-router\");\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../controllers */ \"./app/controllers/index.js\");\n\n\n\nconst router = koa_router__WEBPACK_IMPORTED_MODULE_0___default()();\n\nrouter.get('/', async function (ctx, next) {\n    ctx.body = await _controllers__WEBPACK_IMPORTED_MODULE_1__[\"appController\"].findAllByPage(ctx);\n});\n\nrouter.get('/all', async function (ctx, next) {\n    ctx.body = await _controllers__WEBPACK_IMPORTED_MODULE_1__[\"appController\"].findAll(ctx);\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./app/routes/api/app.js?");

/***/ }),

/***/ "./app/routes/api/image.js":
/*!*********************************!*\
  !*** ./app/routes/api/image.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ \"koa-router\");\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../controllers */ \"./app/controllers/index.js\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ \"moment\");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils */ \"./app/utils/index.js\");\n\n\n\n\n\n\n\nconst router = koa_router__WEBPACK_IMPORTED_MODULE_0___default()();\nrouter.get('/view/:id', async function (ctx, next) {\n    const result = await _controllers__WEBPACK_IMPORTED_MODULE_1__[\"imageController\"].findOneById(ctx);\n    if (!result.data) {\n        ctx.status = 404;\n        return;\n    }\n    const image = result.data;\n    const imagePath = path__WEBPACK_IMPORTED_MODULE_3___default.a.join(ctx._dir_path, image.path);\n    const imageStat = await _utils__WEBPACK_IMPORTED_MODULE_5__[\"fileUtil\"].stat(imagePath);\n    if (imageStat.isFile()) {\n        ctx.status = result.code;\n        ctx.type = image.mime;\n        ctx.body = await _utils__WEBPACK_IMPORTED_MODULE_5__[\"fileUtil\"].readImage(imagePath);\n    }\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./app/routes/api/image.js?");

/***/ }),

/***/ "./app/routes/api/index.js":
/*!*********************************!*\
  !*** ./app/routes/api/index.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ \"koa-router\");\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./image */ \"./app/routes/api/image.js\");\n/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user */ \"./app/routes/api/user.js\");\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app */ \"./app/routes/api/app.js\");\n\n\n\n\n\nconst router = koa_router__WEBPACK_IMPORTED_MODULE_0___default()();\n\nrouter.use('/api/image', _image__WEBPACK_IMPORTED_MODULE_1__[\"default\"].routes(), _image__WEBPACK_IMPORTED_MODULE_1__[\"default\"].allowedMethods());\nrouter.use('/api/user', _user__WEBPACK_IMPORTED_MODULE_2__[\"default\"].routes(), _user__WEBPACK_IMPORTED_MODULE_2__[\"default\"].allowedMethods());\nrouter.use('/api/app', _app__WEBPACK_IMPORTED_MODULE_3__[\"default\"].routes(), _app__WEBPACK_IMPORTED_MODULE_3__[\"default\"].allowedMethods());\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./app/routes/api/index.js?");

/***/ }),

/***/ "./app/routes/api/user.js":
/*!********************************!*\
  !*** ./app/routes/api/user.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ \"koa-router\");\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../controllers */ \"./app/controllers/index.js\");\n\n\n\nconst router = koa_router__WEBPACK_IMPORTED_MODULE_0___default()();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./app/routes/api/user.js?");

/***/ }),

/***/ "./app/routes/page/index.js":
/*!**********************************!*\
  !*** ./app/routes/page/index.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ \"koa-router\");\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./page */ \"./app/routes/page/page.js\");\n\n\n\nconst router = koa_router__WEBPACK_IMPORTED_MODULE_0___default()();\n\nrouter.use('/', _page__WEBPACK_IMPORTED_MODULE_1__[\"default\"].routes(), _page__WEBPACK_IMPORTED_MODULE_1__[\"default\"].allowedMethods());\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./app/routes/page/index.js?");

/***/ }),

/***/ "./app/routes/page/page.js":
/*!*********************************!*\
  !*** ./app/routes/page/page.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ \"koa-router\");\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nconst adminRouter = koa_router__WEBPACK_IMPORTED_MODULE_0___default()();\nlet template = null;\n\nasync function fuc(ctx, next) {\n    if (!template) {\n        template = Object(fs__WEBPACK_IMPORTED_MODULE_1__[\"readFileSync\"])(Object(path__WEBPACK_IMPORTED_MODULE_2__[\"join\"])(ctx._dir_path, 'public/admin', 'index.html')).toString();\n    }\n    ctx.type = 'html';\n    ctx.body = template.replace('${CSRF}', ctx.csrf);\n}\n\nadminRouter.get('/', fuc);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (adminRouter);\n\n//# sourceURL=webpack:///./app/routes/page/page.js?");

/***/ }),

/***/ "./app/routes/web/app.js":
/*!*******************************!*\
  !*** ./app/routes/web/app.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ \"koa-router\");\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../controllers */ \"./app/controllers/index.js\");\n\n\n\nconst router = koa_router__WEBPACK_IMPORTED_MODULE_0___default()();\n\nrouter.post('/', async function (ctx, next) {\n    ctx.body = await _controllers__WEBPACK_IMPORTED_MODULE_1__[\"appController\"].create(ctx);\n});\n\nrouter.get('/', async function (ctx, next) {\n    ctx.body = await _controllers__WEBPACK_IMPORTED_MODULE_1__[\"appController\"].findAllByPage(ctx);\n});\n\nrouter.get('/all', async function (ctx, next) {\n    ctx.body = await _controllers__WEBPACK_IMPORTED_MODULE_1__[\"appController\"].findAll(ctx);\n});\n\nrouter.get('/goto', async function (ctx, next) {\n    const data = await _controllers__WEBPACK_IMPORTED_MODULE_1__[\"appController\"].gotoApp(ctx);\n    ctx.status = data.status;\n    if (ctx.status > 400) {} else {\n        ctx.redirect(data.url);\n    }\n});\n\nrouter.get('/:id', async function (ctx, next) {\n    ctx.body = await _controllers__WEBPACK_IMPORTED_MODULE_1__[\"appController\"].findOneById(ctx);\n});\n\nrouter.put('/:id', async function (ctx, next) {\n    ctx.body = await _controllers__WEBPACK_IMPORTED_MODULE_1__[\"appController\"].update(ctx);\n});\n\nrouter.delete('/:id', async function (ctx, next) {\n    ctx.body = await _controllers__WEBPACK_IMPORTED_MODULE_1__[\"appController\"].remove(ctx);\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./app/routes/web/app.js?");

/***/ }),

/***/ "./app/routes/web/auth.js":
/*!********************************!*\
  !*** ./app/routes/web/auth.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ \"koa-router\");\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../controllers */ \"./app/controllers/index.js\");\n\n\n\nconst router = koa_router__WEBPACK_IMPORTED_MODULE_0___default()();\n\nrouter.post('/', async function (ctx, next) {\n    ctx.body = await _controllers__WEBPACK_IMPORTED_MODULE_1__[\"userAppController\"].create(ctx);\n});\n\nrouter.put('/:appId', async function (ctx, next) {\n    ctx.body = await _controllers__WEBPACK_IMPORTED_MODULE_1__[\"userAppController\"].updateUserApp(ctx);\n});\n\nrouter.delete('/:uid/:appid', async function (ctx, next) {\n    ctx.body = await _controllers__WEBPACK_IMPORTED_MODULE_1__[\"userAppController\"].remove(ctx);\n});\n\nrouter.get('/user/apps', async function (ctx, next) {\n    ctx.body = await _controllers__WEBPACK_IMPORTED_MODULE_1__[\"userAppController\"].getUserApps(ctx);\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./app/routes/web/auth.js?");

/***/ }),

/***/ "./app/routes/web/ignore.js":
/*!**********************************!*\
  !*** ./app/routes/web/ignore.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _controllers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../controllers */ \"./app/controllers/index.js\");\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! koa-router */ \"koa-router\");\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconst router = koa_router__WEBPACK_IMPORTED_MODULE_1___default()();\n\nrouter.post('/user/checklogin', async function (ctx, next) {\n    ctx.body = await _controllers__WEBPACK_IMPORTED_MODULE_0__[\"userController\"].checkLogin(ctx);\n});\n\nrouter.get('/apps/info/:id', async function (ctx, next) {\n    ctx.body = await _controllers__WEBPACK_IMPORTED_MODULE_0__[\"appController\"].findOneById2Login(ctx);\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./app/routes/web/ignore.js?");

/***/ }),

/***/ "./app/routes/web/image.js":
/*!*********************************!*\
  !*** ./app/routes/web/image.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ \"koa-router\");\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../controllers */ \"./app/controllers/index.js\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ \"moment\");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils */ \"./app/utils/index.js\");\n\n\n\n\n\n\n\nconst router = koa_router__WEBPACK_IMPORTED_MODULE_0___default()();\nrouter.get('/view/:id', async function (ctx, next) {\n    const result = await _controllers__WEBPACK_IMPORTED_MODULE_1__[\"imageController\"].findOneById(ctx);\n    if (!result.data) {\n        ctx.status = 404;\n        return;\n    }\n    const image = result.data;\n    const imagePath = path__WEBPACK_IMPORTED_MODULE_3___default.a.join(ctx._dir_path, image.path);\n    const imageStat = await _utils__WEBPACK_IMPORTED_MODULE_5__[\"fileUtil\"].stat(imagePath);\n    if (imageStat.isFile()) {\n        ctx.status = result.code;\n        ctx.type = image.mime;\n        ctx.body = await _utils__WEBPACK_IMPORTED_MODULE_5__[\"fileUtil\"].readImage(imagePath);\n    }\n});\n\nrouter.get('/', async function (ctx, next) {\n    ctx.body = await _controllers__WEBPACK_IMPORTED_MODULE_1__[\"imageController\"].findAllByPage(ctx);\n});\n\nrouter.get('/all', async function (ctx, next) {\n    ctx.body = await _controllers__WEBPACK_IMPORTED_MODULE_1__[\"imageController\"].findAll(ctx);\n});\n\nrouter.post('/', async function (ctx, next) {\n    const file = ctx.request.files.file;\n    const reader = fs__WEBPACK_IMPORTED_MODULE_2___default.a.createReadStream(file.path);\n    const nowTime = moment__WEBPACK_IMPORTED_MODULE_4___default()().format('YYYY-MM-DD');\n    const lastPath = `uploads/images/${nowTime}`;\n    const random = Number.parseInt(Math.random().toString() * 1000000);\n    const array = file.name.split('.');\n    const ext = array[array.length - 1];\n    const unixRandom = `${lastPath}/${moment__WEBPACK_IMPORTED_MODULE_4___default()().unix()}${random}.${ext}`;\n    const savePath = path__WEBPACK_IMPORTED_MODULE_3___default.a.join(ctx._dir_path, unixRandom);\n    _utils__WEBPACK_IMPORTED_MODULE_5__[\"fileUtil\"].mkDirSync(lastPath, ctx._dir_path)();\n    const stream = fs__WEBPACK_IMPORTED_MODULE_2___default.a.createWriteStream(savePath);\n    reader.pipe(stream);\n    file.path = unixRandom;\n    ctx.body = await _controllers__WEBPACK_IMPORTED_MODULE_1__[\"imageController\"].create(ctx, file);\n});\n\nrouter.put('/:id', async function (ctx, next) {\n    ctx.body = await _controllers__WEBPACK_IMPORTED_MODULE_1__[\"imageController\"].update(ctx);\n});\n\nrouter.delete('/:id', async function (ctx, next) {\n    //TODO REMOVE IMAGE IN DIR.\n    ctx.body = await _controllers__WEBPACK_IMPORTED_MODULE_1__[\"imageController\"].remove(ctx);\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./app/routes/web/image.js?");

/***/ }),

/***/ "./app/routes/web/index.js":
/*!*********************************!*\
  !*** ./app/routes/web/index.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ \"koa-router\");\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user */ \"./app/routes/web/user.js\");\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app */ \"./app/routes/web/app.js\");\n/* harmony import */ var _image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./image */ \"./app/routes/web/image.js\");\n/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./auth */ \"./app/routes/web/auth.js\");\n/* harmony import */ var _ignore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ignore */ \"./app/routes/web/ignore.js\");\n/* harmony import */ var _oauth__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./oauth */ \"./app/routes/web/oauth.js\");\n\n\n\n\n\n\n\n\nconst router = koa_router__WEBPACK_IMPORTED_MODULE_0___default()();\n\nrouter.use('/web/user', _user__WEBPACK_IMPORTED_MODULE_1__[\"default\"].routes(), _user__WEBPACK_IMPORTED_MODULE_1__[\"default\"].allowedMethods());\nrouter.use('/web/image', _image__WEBPACK_IMPORTED_MODULE_3__[\"default\"].routes(), _image__WEBPACK_IMPORTED_MODULE_3__[\"default\"].allowedMethods());\nrouter.use('/web/apps', _app__WEBPACK_IMPORTED_MODULE_2__[\"default\"].routes(), _app__WEBPACK_IMPORTED_MODULE_2__[\"default\"].allowedMethods());\nrouter.use('/web/auth', _auth__WEBPACK_IMPORTED_MODULE_4__[\"default\"].routes(), _auth__WEBPACK_IMPORTED_MODULE_4__[\"default\"].allowedMethods());\nrouter.use('/web/ignore', _ignore__WEBPACK_IMPORTED_MODULE_5__[\"default\"].routes(), _ignore__WEBPACK_IMPORTED_MODULE_5__[\"default\"].allowedMethods());\nrouter.use('/web/oauth', _oauth__WEBPACK_IMPORTED_MODULE_6__[\"default\"].routes(), _oauth__WEBPACK_IMPORTED_MODULE_6__[\"default\"].allowedMethods());\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./app/routes/web/index.js?");

/***/ }),

/***/ "./app/routes/web/oauth.js":
/*!*********************************!*\
  !*** ./app/routes/web/oauth.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ \"koa-router\");\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../controllers */ \"./app/controllers/index.js\");\n\n\n\nconst router = koa_router__WEBPACK_IMPORTED_MODULE_0___default()();\n\nrouter.post('/login', async function (ctx, next) {\n    ctx.body = await _controllers__WEBPACK_IMPORTED_MODULE_1__[\"userController\"].userInfo(ctx);\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./app/routes/web/oauth.js?");

/***/ }),

/***/ "./app/routes/web/user.js":
/*!********************************!*\
  !*** ./app/routes/web/user.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ \"koa-router\");\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../controllers */ \"./app/controllers/index.js\");\n\n\n\nconst router = koa_router__WEBPACK_IMPORTED_MODULE_0___default()();\n\nrouter.post('/logined', async function (ctx, next) {\n    const data = await _controllers__WEBPACK_IMPORTED_MODULE_1__[\"userController\"].logined(ctx);\n    ctx.status = data.status;\n    if (ctx.status > 400) {} else {\n        ctx.redirect(data.url);\n    }\n});\n\nrouter.get('/logout', async function (ctx, next) {\n    ctx.body = await _controllers__WEBPACK_IMPORTED_MODULE_1__[\"userController\"].logout(ctx);\n});\n\nrouter.put('/', async function (ctx, next) {\n    ctx.body = await _controllers__WEBPACK_IMPORTED_MODULE_1__[\"userController\"].updateUser(ctx);\n});\n\nrouter.post('/', async function (ctx, next) {\n    ctx.body = await _controllers__WEBPACK_IMPORTED_MODULE_1__[\"userController\"].create(ctx);\n});\n\nrouter.get('/', async function (ctx, next) {\n    ctx.body = await _controllers__WEBPACK_IMPORTED_MODULE_1__[\"userController\"].findAllByPage(ctx);\n});\n\nrouter.delete('/:id', async function (ctx) {\n    ctx.body = await _controllers__WEBPACK_IMPORTED_MODULE_1__[\"userController\"].remove(ctx);\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./app/routes/web/user.js?");

/***/ }),

/***/ "./app/services/accessTokenService.js":
/*!********************************************!*\
  !*** ./app/services/accessTokenService.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _baseService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./baseService */ \"./app/services/baseService.js\");\n/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models */ \"./app/models/index.js\");\n/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sequelize */ \"sequelize\");\n/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sequelize__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ \"moment\");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var uuid_v1__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! uuid/v1 */ \"./node_modules/uuid/v1.js\");\n/* harmony import */ var uuid_v1__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(uuid_v1__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\n\nconst Op = sequelize__WEBPACK_IMPORTED_MODULE_2___default.a.Op;\n\nconst accessTokenService = {\n    model: _models__WEBPACK_IMPORTED_MODULE_1__[\"access_token\"],\n    findAll: function (opt) {\n        opt = { where: opt };\n        return this.model.findAll(opt);\n    },\n    findAndCountAll: function (limit, offset, keyword) {\n        const opt = {};\n        if (keyword) {\n            opt.name = { [Op.like]: `%${keyword}%` };\n        }\n        return this.model.findAndCountAll({\n            order: [['id', 'desc']],\n            where: opt,\n            limit, offset\n        });\n    },\n    getAccessTokenRelatedUID: async function (act) {\n        const tokenInfo = await this.model.findOne({ 'access_token': act });\n        if (tokenInfo.uid) {\n            return false;\n        } else if (tokenInfo.expired_time < moment__WEBPACK_IMPORTED_MODULE_3___default()().unix()) {\n            return false;\n        }\n        return tokenInfo.uid;\n    },\n    refreshAccessToken: async function (act) {\n        const tokenInfo = await this.model.findOne({ 'access_token': act });\n        if (tokenInfo.uid) {\n            return false;\n        }\n        tokenInfo.access_token = `access@${uuid_v1__WEBPACK_IMPORTED_MODULE_4___default()()}`;\n        tokenInfo.expired_time = moment__WEBPACK_IMPORTED_MODULE_3___default()().unix() + 7200;\n        this.model.update(tokenInfo, { id: tokenInfo.id });\n        return tokenInfo;\n    },\n    generateRefreshToken: function (uid) {\n        const tokenInfo = {\n            uid,\n            refresh_token: `refresh@${uuid_v1__WEBPACK_IMPORTED_MODULE_4___default()()}`,\n            access_token: `access@${uuid_v1__WEBPACK_IMPORTED_MODULE_4___default()()}`,\n            expired_time: moment__WEBPACK_IMPORTED_MODULE_3___default()().unix() + 7200\n        };\n        return this.model.create(tokenInfo);\n    },\n    refreshTmpToken: async function (ctx, uid) {\n        if (!uid) {\n            throw new Error('parameter error!', 1);\n        }\n        const tmp_token = `tmp@${uuid_v1__WEBPACK_IMPORTED_MODULE_4___default()()}`;\n        ctx.cache.set(tmp_token, uid);\n        return tmp_token;\n    },\n    checkAccessToken: async function (opt, ctx) {\n        let tokenInfo = await this.findOne(opt);\n        if (tokenInfo.expired_time < moment__WEBPACK_IMPORTED_MODULE_3___default()().unix()) {\n            if (ctx.session.user) {\n                tokenInfo = await this.model.refreshAccessToken(tokenInfo.access_token);\n                return tokenInfo.dataValues;\n            }\n            return false;\n        }\n        return tokenInfo.dataValues;\n    }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object.assign(accessTokenService, _baseService__WEBPACK_IMPORTED_MODULE_0__[\"default\"]));\n\n//# sourceURL=webpack:///./app/services/accessTokenService.js?");

/***/ }),

/***/ "./app/services/appService.js":
/*!************************************!*\
  !*** ./app/services/appService.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _baseService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./baseService */ \"./app/services/baseService.js\");\n/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models */ \"./app/models/index.js\");\n/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sequelize */ \"sequelize\");\n/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sequelize__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nconst Op = sequelize__WEBPACK_IMPORTED_MODULE_2___default.a.Op;\n\nconst appService = {\n    model: _models__WEBPACK_IMPORTED_MODULE_1__[\"app\"],\n    findAll: function (opt) {\n        opt = { where: opt };\n        return this.model.findAll(opt);\n    },\n    findAndCountAll: function (limit, offset, keyword) {\n        const opt = {};\n        if (keyword) {\n            opt.name = { [Op.like]: `%${keyword}%` };\n        }\n        return this.model.findAndCountAll({\n            order: [['id', 'asc']],\n            where: opt,\n            limit, offset\n        });\n    }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object.assign(appService, _baseService__WEBPACK_IMPORTED_MODULE_0__[\"default\"]));\n\n//# sourceURL=webpack:///./app/services/appService.js?");

/***/ }),

/***/ "./app/services/baseService.js":
/*!*************************************!*\
  !*** ./app/services/baseService.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst baseService = {\n    create: function (model) {\n        return this.model.create(model);\n    },\n    findOne: function (opt) {\n        opt = { where: opt };\n        return this.model.findOne(opt);\n    },\n    update: function (val, con) {\n        con = { where: con };\n        delete val.id;\n        return this.model.update(val, con);\n    },\n    delete: function (opt) {\n        opt = { where: opt };\n        return this.model.destroy(opt);\n    }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (baseService);\n\n//# sourceURL=webpack:///./app/services/baseService.js?");

/***/ }),

/***/ "./app/services/imageService.js":
/*!**************************************!*\
  !*** ./app/services/imageService.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _baseService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./baseService */ \"./app/services/baseService.js\");\n/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models */ \"./app/models/index.js\");\n/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sequelize */ \"sequelize\");\n/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sequelize__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nconst Op = sequelize__WEBPACK_IMPORTED_MODULE_2___default.a.Op;\n\nconst imageService = {\n    model: _models__WEBPACK_IMPORTED_MODULE_1__[\"image\"],\n    findAll: function (opt) {\n        opt = { where: opt };\n        return this.model.findAll(opt);\n    },\n    findAndCountAll: function (limit, offset, keyword) {\n        const opt = {};\n        if (keyword) {\n            opt.name = { [Op.like]: `%${keyword}%` };\n        }\n        return this.model.findAndCountAll({\n            order: [['id', 'desc']],\n            where: opt,\n            limit, offset\n        });\n    }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object.assign(imageService, _baseService__WEBPACK_IMPORTED_MODULE_0__[\"default\"]));\n\n//# sourceURL=webpack:///./app/services/imageService.js?");

/***/ }),

/***/ "./app/services/index.js":
/*!*******************************!*\
  !*** ./app/services/index.js ***!
  \*******************************/
/*! exports provided: userService, accessTokenService, appService, imageService, userAppService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _userService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./userService */ \"./app/services/userService.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"userService\", function() { return _userService__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _imageService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./imageService */ \"./app/services/imageService.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"imageService\", function() { return _imageService__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony import */ var _appService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./appService */ \"./app/services/appService.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"appService\", function() { return _appService__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; });\n\n/* harmony import */ var _accessTokenService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./accessTokenService */ \"./app/services/accessTokenService.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"accessTokenService\", function() { return _accessTokenService__WEBPACK_IMPORTED_MODULE_3__[\"default\"]; });\n\n/* harmony import */ var _userAppService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./userAppService */ \"./app/services/userAppService.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"userAppService\", function() { return _userAppService__WEBPACK_IMPORTED_MODULE_4__[\"default\"]; });\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./app/services/index.js?");

/***/ }),

/***/ "./app/services/userAppService.js":
/*!****************************************!*\
  !*** ./app/services/userAppService.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _baseService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./baseService */ \"./app/services/baseService.js\");\n/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models */ \"./app/models/index.js\");\n/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sequelize */ \"sequelize\");\n/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sequelize__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nconst Op = sequelize__WEBPACK_IMPORTED_MODULE_2___default.a.Op;\n\nconst userAppService = {\n    model: _models__WEBPACK_IMPORTED_MODULE_1__[\"userApp\"],\n    findAll: function (opt) {\n        opt = { where: opt };\n        return this.model.findAll(opt);\n    },\n    findAndCountAll: function (limit, offset, keyword) {\n        const opt = {};\n        if (keyword) {\n            opt.name = { [Op.like]: `%${keyword}%` };\n        }\n        return this.model.findAndCountAll({\n            order: [['id', 'desc']],\n            where: opt,\n            limit, offset\n        });\n    }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object.assign(userAppService, _baseService__WEBPACK_IMPORTED_MODULE_0__[\"default\"]));\n\n//# sourceURL=webpack:///./app/services/userAppService.js?");

/***/ }),

/***/ "./app/services/userService.js":
/*!*************************************!*\
  !*** ./app/services/userService.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _baseService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./baseService */ \"./app/services/baseService.js\");\n/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models */ \"./app/models/index.js\");\n/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sequelize */ \"sequelize\");\n/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sequelize__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nconst Op = sequelize__WEBPACK_IMPORTED_MODULE_2___default.a.Op;\n\nconst userService = {\n    model: _models__WEBPACK_IMPORTED_MODULE_1__[\"user\"],\n    findAndCountAll: function (limit, offset, keyword, includes) {\n        const opt = {};\n        if (keyword) {\n            opt.$or = {};\n            opt.$or.name = { [Op.like]: `%${keyword}%` };\n            opt.$or.account = { [Op.like]: `%${keyword}%` };\n        }\n        const condition = {\n            order: [['id', 'asc']],\n            where: opt,\n            limit, offset\n        };\n        if (includes) {\n            condition.include = {\n                model: _models__WEBPACK_IMPORTED_MODULE_1__[\"app\"],\n                as: 'app'\n            };\n        }\n        return this.model.findAndCountAll(condition);\n    }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object.assign(userService, _baseService__WEBPACK_IMPORTED_MODULE_0__[\"default\"]));\n\n//# sourceURL=webpack:///./app/services/userService.js?");

/***/ }),

/***/ "./app/utils/cache.js":
/*!****************************!*\
  !*** ./app/utils/cache.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Cache; });\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ \"moment\");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ */ \"./app/utils/index.js\");\n\n\n\nconst { validator } = ___WEBPACK_IMPORTED_MODULE_1__[\"normalUtil\"];\n\nclass Cache {\n    constructor() {\n        this.cacheMap = new Map();\n    }\n\n    static CreateData(val, time = 60) {\n        return {\n            data: val,\n            time: moment__WEBPACK_IMPORTED_MODULE_0___default()().unix() + time\n        };\n    }\n\n    static Check(key) {\n        if (validator.isEmpty(key)) {\n            throw new Error('the key can not be empty');\n        }\n        return true;\n    }\n\n    set(key, val, time) {\n        if (Cache.Check(key)) {\n            const data = Cache.CreateData(val, time);\n            this.cacheMap.set(key, data);\n        }\n    }\n\n    get(key) {\n        if (Cache.Check(key)) {\n            const data = this.cacheMap.get(key);\n            if (!data || data.time < moment__WEBPACK_IMPORTED_MODULE_0___default()().unix()) {\n                this.cacheMap.delete(key);\n                return null;\n            }\n            return data.data;\n        }\n    }\n\n    pull(key) {\n        const data = this.get(key);\n        this.cacheMap.delete(key);\n        return data;\n    }\n}\n\n//# sourceURL=webpack:///./app/utils/cache.js?");

/***/ }),

/***/ "./app/utils/file.js":
/*!***************************!*\
  !*** ./app/utils/file.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nfunction mkDirSync(path, dir) {\n\n    const dirArr = path.split('/');\n    let index = 0;\n    let pathUrl = `${dir}/`;\n\n    return function make() {\n        if (index > dirArr.length - 1) {\n            return;\n        }\n        pathUrl += `${dirArr[index]}/`;\n        try {\n            index++;\n            fs__WEBPACK_IMPORTED_MODULE_0___default.a.mkdirSync(pathUrl);\n        } catch (err) {\n            if (err.code === 'EEXIST') {\n                make();\n            }\n        }\n    };\n}\n\nfunction readImage(filePath) {\n    // 创建可读流\n    let data = [];\n    return new Promise((res, rej) => {\n        const readerStream = fs__WEBPACK_IMPORTED_MODULE_0___default.a.createReadStream(filePath);\n        readerStream.on('data', function (chunk) {\n            data.push(chunk);\n        });\n        readerStream.on('end', function () {\n            const finalData = Buffer.concat(data); // 合并Buffer\n            res(finalData);\n        });\n        readerStream.on('error', err => {\n            rej(err);\n        });\n    });\n}\n\nfunction stat(path) {\n    return new Promise(function (resolve, reject) {\n        fs__WEBPACK_IMPORTED_MODULE_0___default.a.stat(path, function (err, stat) {\n            if (err) {\n                reject(err);\n            } else {\n                resolve(stat);\n            }\n        });\n    });\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n    readImage, stat, mkDirSync\n});\n\n//# sourceURL=webpack:///./app/utils/file.js?");

/***/ }),

/***/ "./app/utils/index.js":
/*!****************************!*\
  !*** ./app/utils/index.js ***!
  \****************************/
/*! exports provided: fileUtil, normalUtil, Cache, httpValidate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _file__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./file */ \"./app/utils/file.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"fileUtil\", function() { return _file__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _normal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./normal */ \"./app/utils/normal.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"normalUtil\", function() { return _normal__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony import */ var _cache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cache */ \"./app/utils/cache.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Cache\", function() { return _cache__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; });\n\n/* harmony import */ var _request_validate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./request.validate */ \"./app/utils/request.validate.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"httpValidate\", function() { return _request_validate__WEBPACK_IMPORTED_MODULE_3__[\"default\"]; });\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./app/utils/index.js?");

/***/ }),

/***/ "./app/utils/normal.js":
/*!*****************************!*\
  !*** ./app/utils/normal.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst errorMap = {\n    'login-invalidate': '登录失败：账号密码错误',\n    'mysql-error': '数据库错误',\n    'input-invalidate': '输入不合法',\n    'input-invalidate-empty': '输入参数为空',\n    'input-invalidate-number': '输入参数必须为数字',\n    'input-invalidate-status': '非法的文章状态',\n    'input-invalidate-oldPwd': '旧密码输入不正确',\n    'data-not-find': '数据未找到或不存在',\n    'data-is-exist': '数据已存在',\n    'no-auth-app': '当前账号无访问此应用权限',\n    'no-logined': '未登录',\n    'too-frequent': '访问太频繁',\n    'must-be-image': '必须是图片',\n    'must-be-local-site': '必须是本站点访问',\n    'access-token-empty': '',\n    'access-token-expired': 'access-token已过期',\n    'expired-time': '时间已过期',\n    'can-not-delete-fishelly': '无法删除此账号',\n    'user-exist': '当前用户已存在'\n\n};\n\nconst deepClone = function (data) {\n    return JSON.parse(JSON.stringify(data));\n};\n\nconst _changeData = function (data) {\n    if (data && data.hasOwnProperty('count') && data.hasOwnProperty('rows')) {\n        data = {\n            total: data.count,\n            list: data.rows\n        };\n    }\n    data = deepClone(data);\n    if (!data) {\n        return null;\n    }\n    if (data instanceof Array) {\n        data = { list: data };\n    }\n    return data;\n};\n\nconst redirectData = function (status = 302, url, msg) {\n    return {\n        status, url, msg: errorMap[msg]\n    };\n};\n\nconst packData = function (code, status, data) {\n    if (status === 'success') {\n        return {\n            code: code,\n            status: status,\n            data: _changeData(data)\n        };\n    } else {\n        return {\n            code: code,\n            status: status,\n            msg: errorMap[data] || data\n        };\n    }\n};\n\nconst validator = {\n    isEmpty(obj) {\n        return typeof obj === 'undefined' || obj === null || typeof obj === 'string' && obj.length === 0;\n    },\n    isNumeric(obj) {\n        return !isNaN(parseFloat(obj)) && isFinite(obj);\n    },\n    numberic(obj) {\n        return this.isNumeric(obj);\n    },\n    numeric(obj) {\n        return this.isNumeric(obj);\n    },\n    isObject(obj) {\n        return typeof obj === 'object' && !(obj instanceof Array);\n    },\n    email(obj) {\n        return (/\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*/.test(obj)\n        );\n    },\n    chinese(obj) {\n        return (/^[\\u4e00-\\u9fa5]{0,}$/.test(obj)\n        );\n    },\n    english(obj) {\n        return (/^[a-zA-Z]+$/.test(obj)\n        );\n    },\n    url(obj) {\n        return (/(^#)|(^http(s*):\\/\\/[^\\s]+\\.[^\\s]+)/.test(obj)\n        );\n    },\n    idcard(obj) {\n        return (/(^\\d{15}$)|(^\\d{17}(x|X|\\d)$)/.test(obj)\n        );\n    },\n    mobile(obj) {\n        return (/^1(3|4|5|7|8)[0-9]\\d{8}$/.test(obj)\n        );\n    },\n    document(obj) {\n        return (/\\.doc(x?)$|\\.xls(x?)$|\\.ppt(x?)$|\\.wps$|\\.pef$|\\.txt$/i.test(obj)\n        );\n    },\n    image(obj) {\n        return (/\\.png|\\.jpg$|\\.jpeg$|\\.bmp$|\\.gif$/i.test(obj)\n        );\n    },\n    video(obj) {\n        return (/\\.wmv$|\\.avi$|\\.mkv$|\\.mp4$|\\.rmvb$/i.test(obj)\n        );\n    },\n    audio(obj) {\n        return (/\\.mp3/i.test(obj)\n        );\n    },\n    archive(obj) {\n        return (/\\.rar$|\\.zip$|\\.7z$|\\.gzip$|\\.tar$|\\.iso$/i.test(obj)\n        );\n    }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({ packData, deepClone, validator, redirectData });\n\n//# sourceURL=webpack:///./app/utils/normal.js?");

/***/ }),

/***/ "./app/utils/request.validate.js":
/*!***************************************!*\
  !*** ./app/utils/request.validate.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return validate; });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ \"./app/utils/index.js\");\n\n\nconst validator = _index__WEBPACK_IMPORTED_MODULE_0__[\"normalUtil\"].validator;\n\nfunction validate(obj, rules) {\n    if (validator.isEmpty(rules)) {\n        throw new Error('rules-is-empty');\n    }\n    if (validator.isObject(rules)) {\n        throw new Error('rules-is-not-object');\n    }\n    const values = [];\n    Object.keys(rules).forEach(key => {\n        const ruleVal = rules[key];\n        if (validator.isEmpty(rules[key])) {\n            throw new Error('rules-key-is-empty');\n        }\n        const ruleArray = ruleVal.split('|');\n        const result = ruleArray.filter(ra => !validator[ra](obj[key]));\n        if (result.length > 0) {\n            values.push({ [key]: result.join('|') });\n        }\n    });\n    if (values.length > 0) {\n        const error = new Error('validate-not-pass');\n        error.values = values;\n        throw error;\n    }\n}\n\n//# sourceURL=webpack:///./app/utils/request.validate.js?");

/***/ }),

/***/ "./bin/www":
/*!*****************!*\
  !*** ./bin/www ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _config_server_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/server.config */ \"./config/server.config.js\");\n/* harmony import */ var _app_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app/app */ \"./app/app.js\");\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! http */ \"http\");\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var https__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! https */ \"https\");\n/* harmony import */ var https__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(https__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _app_middleware__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../app/middleware */ \"./app/middleware/index.js\");\n// #!/usr/bin/env node\n\n/**\n * Module dependencies.\n */\n\n\n\n\n\n\n\nconst {log4js} = _app_middleware__WEBPACK_IMPORTED_MODULE_5__[\"loggerMiddleware\"];\nconst logger = log4js.getLogger('startup');\n/**\n * Get port from environment and store in Express.\n */\n\nconst port = normalizePort(_config_server_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].port || '80');\n\n/**\n * Create HTTP server.\n */\n\nlet httpServer = null;\nlet httpsServer = null;\n\n/**\n * Listen on provided port, on all network interfaces.\n */\n\nif (_config_server_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].useHttps) {\n    httpsServer = https__WEBPACK_IMPORTED_MODULE_3___default.a.createServer({\n        key: fs__WEBPACK_IMPORTED_MODULE_4___default.a.readFileSync(`${_config_server_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ssl.path}${_config_server_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ssl.key}`),\n        cert: fs__WEBPACK_IMPORTED_MODULE_4___default.a.readFileSync(`${_config_server_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ssl.path}${_config_server_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ssl.pem}`),\n        passphrase: _config_server_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ssl.passphrase\n    }, function (req, res) {\n        if (!req.headers.host.includes('www.')) {\n            const url = req.url.substr(1);\n            res.writeHead(301, {'Location': `${_config_server_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].host}${url}`});\n            res.end();\n            return;\n        }\n        return _app_app__WEBPACK_IMPORTED_MODULE_1__[\"default\"].callback()(req, res);\n    });\n\n    httpsServer.listen(normalizePort(_config_server_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ssl.port || '443'));\n    httpsServer.on('error', onError);\n    httpsServer.on('listening', onListening);\n    httpServer = http__WEBPACK_IMPORTED_MODULE_2___default.a.createServer(function (req, res) {\n        const url = req.url.substr(1);\n        res.writeHead(301, {'Location': `${_config_server_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].host}${url}`});\n        res.end();\n        // res.writeHead(200,{\"Content-type\":\"text/html\"});\n        // res.write(`<html><body><script>window.location.href='${config.host}${url}'</script></body></html>`);\n        // res.end();\n    });\n} else {\n    httpServer = http__WEBPACK_IMPORTED_MODULE_2___default.a.createServer(_app_app__WEBPACK_IMPORTED_MODULE_1__[\"default\"].callback());\n}\n\nhttpServer.listen(port);\nhttpServer.on('error', onError);\nhttpServer.on('listening', onListening);\n\n/**\n * Normalize a port into a number, string, or false.\n */\n\nfunction normalizePort (val) {\n    const port = parseInt(val, 10);\n\n    if (isNaN(port)) {\n        // named pipe\n        return val;\n    }\n\n    if (port >= 0) {\n        // port number\n        return port;\n    }\n\n    return false;\n}\n\n/**\n * Event listener for HTTP server \"error\" event.\n */\n\nfunction onError (error) {\n    if (error.syscall !== 'listen') {\n        logger.error('error: ' + error);\n        throw error;\n    }\n\n    const bind = typeof port === 'string'\n        ? 'Pipe ' + port\n        : 'Port ' + port;\n\n    // handle specific listen errors with friendly messages\n    switch (error.code) {\n        case 'EACCES':\n            logger.error(bind + ' requires elevated privileges');\n            process.exit(1);\n            break;\n        case 'EADDRINUSE':\n            logger.error(bind + ' is already in use');\n            process.exit(1);\n            break;\n        default:\n            logger.error('error: ' + error);\n            throw error;\n    }\n}\n\n/**\n * Event listener for HTTP server \"listening\" event.\n */\n\nfunction onListening () {\n    let addr = httpServer.address();\n    const bind = typeof addr === 'string'\n        ? 'pipe ' + addr\n        : 'port ' + addr.port;\n    logger.info('HTTP Listening on ' + bind);\n\n    if (_config_server_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].useHttps) {\n        addr = httpsServer.address();\n        logger.info('HTTPS Listening on ' + _config_server_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ssl.port);\n    }\n}\n\n\n//# sourceURL=webpack:///./bin/www?");

/***/ }),

/***/ "./config/database.config.js":
/*!***********************************!*\
  !*** ./config/database.config.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app_middleware__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app/middleware */ \"./app/middleware/index.js\");\n\n\nconst logger = _app_middleware__WEBPACK_IMPORTED_MODULE_0__[\"loggerMiddleware\"].log4js.getLogger('mysql');\n\nconst dbConfig = {\n    username: 'root',\n    password: 'root',\n    dbname: 'koa-usercenter',\n    options: {\n        logging: function (sql) {\n            logger.info(sql);\n        },\n        'host': 'localhost',\n        'port': 3306,\n        'dialect': 'mysql',\n        'timezone': '+08:00',\n        'pool': {\n            'max': 3,\n            'min': 0,\n            'idle': 10000\n        }\n    }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (dbConfig);\n\n//# sourceURL=webpack:///./config/database.config.js?");

/***/ }),

/***/ "./config/server.config.js":
/*!*********************************!*\
  !*** ./config/server.config.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst LOG_PATH = './logs/';\n\nconst serverConfig = {\n    port: 4000,\n    ssl: {\n        path: '',\n        key: '',\n        pem: '',\n        port: 443,\n        passphrase: ''\n    },\n    host: 'http://localhost:3200/',\n    useHttps: false,\n    log: {\n        appenders: {\n            out: {\n                type: 'console'\n            },\n            http: {\n                type: 'dateFile',\n                filename: `${LOG_PATH}http`,\n                pattern: '-yyyy-MM-dd.log',\n                alwaysIncludePattern: true\n            },\n            error: {\n                type: 'dateFile',\n                filename: `${LOG_PATH}error`,\n                pattern: '-yyyy-MM-dd.log',\n                alwaysIncludePattern: true\n            },\n            app: {\n                'type': 'dateFile',\n                filename: `${LOG_PATH}app`,\n                pattern: '-yyyy-MM-dd.log',\n                alwaysIncludePattern: true\n            },\n            startup: {\n                'type': 'dateFile',\n                filename: `${LOG_PATH}startup`,\n                pattern: '-yyyy-MM-dd.log',\n                alwaysIncludePattern: true\n            },\n            default: {\n                type: 'dateFile',\n                filename: `${LOG_PATH}default`,\n                'pattern': '-yyyy-MM-dd.log',\n                alwaysIncludePattern: true\n            },\n            mysql: {\n                type: 'dateFile',\n                filename: `${LOG_PATH}mysql`,\n                'pattern': '-yyyy-MM-dd.log',\n                alwaysIncludePattern: true\n            }\n        },\n        categories: {\n            default: { appenders: ['out', 'default'], level: 'info' },\n            http: { appenders: ['http'], level: 'info' },\n            startup: { appenders: ['out', 'startup'], level: 'info' },\n            error: { appenders: ['error'], level: 'error' },\n            app: { appenders: ['app'], level: 'info' },\n            mysql: { appenders: ['mysql'], level: 'info' }\n        }\n    }\n\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (serverConfig);\n\n//# sourceURL=webpack:///./config/server.config.js?");

/***/ }),

/***/ "./node_modules/uuid/lib/bytesToUuid.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/bytesToUuid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Convert array of 16 byte values to UUID string format of the form:\n * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX\n */\nvar byteToHex = [];\nfor (var i = 0; i < 256; ++i) {\n  byteToHex[i] = (i + 0x100).toString(16).substr(1);\n}\n\nfunction bytesToUuid(buf, offset) {\n  var i = offset || 0;\n  var bth = byteToHex;\n  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4\n  return [bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]]].join('');\n}\n\nmodule.exports = bytesToUuid;\n\n//# sourceURL=webpack:///./node_modules/uuid/lib/bytesToUuid.js?");

/***/ }),

/***/ "./node_modules/uuid/lib/rng.js":
/*!**************************************!*\
  !*** ./node_modules/uuid/lib/rng.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Unique ID creation requires a high quality random # generator.  In node.js\n// this is pretty straight-forward - we use the crypto API.\n\nvar crypto = __webpack_require__(/*! crypto */ \"crypto\");\n\nmodule.exports = function nodeRNG() {\n  return crypto.randomBytes(16);\n};\n\n//# sourceURL=webpack:///./node_modules/uuid/lib/rng.js?");

/***/ }),

/***/ "./node_modules/uuid/v1.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v1.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var rng = __webpack_require__(/*! ./lib/rng */ \"./node_modules/uuid/lib/rng.js\");\nvar bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ \"./node_modules/uuid/lib/bytesToUuid.js\");\n\n// **`v1()` - Generate time-based UUID**\n//\n// Inspired by https://github.com/LiosK/UUID.js\n// and http://docs.python.org/library/uuid.html\n\nvar _nodeId;\nvar _clockseq;\n\n// Previous uuid creation time\nvar _lastMSecs = 0;\nvar _lastNSecs = 0;\n\n// See https://github.com/broofa/node-uuid for API details\nfunction v1(options, buf, offset) {\n  var i = buf && offset || 0;\n  var b = buf || [];\n\n  options = options || {};\n  var node = options.node || _nodeId;\n  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;\n\n  // node and clockseq need to be initialized to random values if they're not\n  // specified.  We do this lazily to minimize issues related to insufficient\n  // system entropy.  See #189\n  if (node == null || clockseq == null) {\n    var seedBytes = rng();\n    if (node == null) {\n      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)\n      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];\n    }\n    if (clockseq == null) {\n      // Per 4.2.2, randomize (14 bit) clockseq\n      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;\n    }\n  }\n\n  // UUID timestamps are 100 nano-second units since the Gregorian epoch,\n  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so\n  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'\n  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.\n  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();\n\n  // Per 4.2.1.2, use count of uuid's generated during the current clock\n  // cycle to simulate higher resolution clock\n  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;\n\n  // Time since last uuid creation (in msecs)\n  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000;\n\n  // Per 4.2.1.2, Bump clockseq on clock regression\n  if (dt < 0 && options.clockseq === undefined) {\n    clockseq = clockseq + 1 & 0x3fff;\n  }\n\n  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new\n  // time interval\n  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {\n    nsecs = 0;\n  }\n\n  // Per 4.2.1.2 Throw error if too many uuids are requested\n  if (nsecs >= 10000) {\n    throw new Error('uuid.v1(): Can\\'t create more than 10M uuids/sec');\n  }\n\n  _lastMSecs = msecs;\n  _lastNSecs = nsecs;\n  _clockseq = clockseq;\n\n  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch\n  msecs += 12219292800000;\n\n  // `time_low`\n  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;\n  b[i++] = tl >>> 24 & 0xff;\n  b[i++] = tl >>> 16 & 0xff;\n  b[i++] = tl >>> 8 & 0xff;\n  b[i++] = tl & 0xff;\n\n  // `time_mid`\n  var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;\n  b[i++] = tmh >>> 8 & 0xff;\n  b[i++] = tmh & 0xff;\n\n  // `time_high_and_version`\n  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version\n  b[i++] = tmh >>> 16 & 0xff;\n\n  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)\n  b[i++] = clockseq >>> 8 | 0x80;\n\n  // `clock_seq_low`\n  b[i++] = clockseq & 0xff;\n\n  // `node`\n  for (var n = 0; n < 6; ++n) {\n    b[i + n] = node[n];\n  }\n\n  return buf ? buf : bytesToUuid(b);\n}\n\nmodule.exports = v1;\n\n//# sourceURL=webpack:///./node_modules/uuid/v1.js?");

/***/ }),

/***/ 0:
/*!***********************!*\
  !*** multi ./bin/www ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./bin/www */\"./bin/www\");\n\n\n//# sourceURL=webpack:///multi_./bin/www?");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"crypto\");\n\n//# sourceURL=webpack:///external_%22crypto%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"https\");\n\n//# sourceURL=webpack:///external_%22https%22?");

/***/ }),

/***/ "koa":
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa\");\n\n//# sourceURL=webpack:///external_%22koa%22?");

/***/ }),

/***/ "koa-body":
/*!***************************!*\
  !*** external "koa-body" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-body\");\n\n//# sourceURL=webpack:///external_%22koa-body%22?");

/***/ }),

/***/ "koa-csrf":
/*!***************************!*\
  !*** external "koa-csrf" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-csrf\");\n\n//# sourceURL=webpack:///external_%22koa-csrf%22?");

/***/ }),

/***/ "koa-log4":
/*!***************************!*\
  !*** external "koa-log4" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-log4\");\n\n//# sourceURL=webpack:///external_%22koa-log4%22?");

/***/ }),

/***/ "koa-router":
/*!*****************************!*\
  !*** external "koa-router" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-router\");\n\n//# sourceURL=webpack:///external_%22koa-router%22?");

/***/ }),

/***/ "koa-send":
/*!***************************!*\
  !*** external "koa-send" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-send\");\n\n//# sourceURL=webpack:///external_%22koa-send%22?");

/***/ }),

/***/ "koa-session":
/*!******************************!*\
  !*** external "koa-session" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-session\");\n\n//# sourceURL=webpack:///external_%22koa-session%22?");

/***/ }),

/***/ "md5":
/*!**********************!*\
  !*** external "md5" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"md5\");\n\n//# sourceURL=webpack:///external_%22md5%22?");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"moment\");\n\n//# sourceURL=webpack:///external_%22moment%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "sequelize":
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"sequelize\");\n\n//# sourceURL=webpack:///external_%22sequelize%22?");

/***/ })

/******/ });