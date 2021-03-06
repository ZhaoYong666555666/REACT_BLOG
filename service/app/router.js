'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
// module.exports = app => {
//     const {router, controller} = app;
//     // 路由
//     router.get('/', controller.home.index);
//     router.get('/list', controller.home.list);
// };

module.exports = app => {
    require('./router/default')(app)
    require('./router/admin')(app)
};
