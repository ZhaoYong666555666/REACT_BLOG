'use strict';
// 调用接口统一管理
const Controller = require('egg').Controller;

class HomeController extends Controller {
    /**
     * sql查询语句
     * */

    async index() {
        // 获取用户表的数据
        let sql = 'select  * from blog_content';
        let result = await this.app.mysql.query(sql);         //  查询全部数据
        console.log(result);
        this.ctx.body = result;
    }

    // 列表接口
    async getArticleList() {
        // 获取博客列表
        let sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
            'article.view_count as view_count ,' +
            'article.article_content  as article_content  ,' +
            '.type.typeName as typeName ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id';
        const results = await this.app.mysql.query(sql);
        this.ctx.body = {
            data: results
        }
    }

    // 详情接口
    async getArticleById() {
        //先配置路由的动态传值，然后再接收值
        let id = this.ctx.params.id;
        let sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            'article.article_content as article_content,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
            'article.view_count as view_count ,' +
            'type.typeName as typeName ,' +
            'type.id as typeId ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
            'WHERE article.id=' + id;
        const result = await this.app.mysql.query(sql);
        this.ctx.body = {data: result};
    }

    //得到类别名称和编号，设置导航的
    async getTypeInfo() {
        const result = await this.app.mysql.select('type');
        this.ctx.body = {data: result}
    }

    //根据类别ID获得文章列表
    async getListById() {
        let id = this.ctx.params.id;
        let sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
            'article.view_count as view_count ,' +
            'type.typeName as typeName ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
            'WHERE type_id=' + id;
        const result = await this.app.mysql.query(sql);
        this.ctx.body = {data: result};
    }

}

module.exports = HomeController;


// --create table ytz6 select zi,nr from ytz5 group by zi,nr order by id asc
// --create table yiti2 select * from yitizi group by zi order by id asc
