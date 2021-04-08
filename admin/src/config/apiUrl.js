// 后台项目接口统一管理
// let ipUrl = 'http://localhost:7001/admin/';
let ipUrl = '/admin/';

let servicePath = {
    checkLogin: ipUrl + 'checkLogin',           //  登录接口，检查用户名和密码
    getTypeInfo: ipUrl + 'getTypeInfo',         //  获得文章类别信息
    addArticle: ipUrl + 'addArticle',           //  保存文章
    updateArticle: ipUrl + 'updateArticle',     //  修改文章
    getArticleList: ipUrl + 'getArticleList',   //  文章列表
    delArticle: ipUrl + 'delArticle/',          //  删除文章
    getArticleById: ipUrl + 'getArticleById/',  //  根据ID获取文章详情
};

export default servicePath;
