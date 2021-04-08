// 后端路由配置
module.exports = app => {
    const {router, controller} = app;
    // 路由守卫中间件，防止未登录进行操作
    var adminauth = app.middleware.adminauth();
    // 首页
    router.get('/admin/index', controller.admin.main.index);
    // 登录
    router.post('/admin/checkLogin', controller.admin.main.checkLogin);
    // 文章类别
    router.get('/admin/getTypeInfo', adminauth, controller.admin.main.getTypeInfo);
    // 保存文章
    router.post('/admin/addArticle', adminauth, controller.admin.main.addArticle);
    // 修改文章
    router.post('/admin/updateArticle', adminauth, controller.admin.main.updateArticle);
    // 文章列表
    router.get('/admin/getArticleList', adminauth, controller.admin.main.getArticleList);
    // 删除文章
    router.get('/admin/delArticle/:id', adminauth, controller.admin.main.delArticle);
    // 修改文章
    router.get('/admin/getArticleById/:id', adminauth, controller.admin.main.getArticleById);
};
