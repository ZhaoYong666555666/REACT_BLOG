'use strict';
// 后端接口
const Controller = require('egg').Controller;

class MainController extends Controller {
    async index() {
        this.ctx.body = 'hi api';
    }

    // 判断用户名密码是否正确
    async checkLogin() {
        // 获取post请求的参数
        let userName = this.ctx.request.body.userName;
        let password = this.ctx.request.body.password;
        const sql = " SELECT userName FROM admin_user WHERE userName = '" + userName +
            "' AND password = '" + password + "'";
        const res = await this.app.mysql.query(sql);
        if (res.length > 0) {
            // 登录成功
            let openId = new Date().getTime();
            this.ctx.session.openId = {openId: openId};
            this.ctx.body = {
                data: '登录成功',
                openId: openId,
                code: 1000,
                message: '登录成功'
            };
        } else {
            this.ctx.body = {
                data: '登录失败',
                code: 5000,
                message: '登录失败'
            };
        }
    }

    // 后台文章分类信息
    async getTypeInfo() {
        const resType = await this.app.mysql.select('type');
        this.ctx.body = {
            data: resType,
            code: 1000,
            message: '成功'
        }
    }

    // 保存文章
    async addArticle() {
        // 获取保存的内容
        let tmpArticle = this.ctx.request.body;
        // 插入数据
        const result = await this.app.mysql.insert('article', tmpArticle);
        // 判断是否保存成功
        const insertSuccess = result.affectedRows === 1;
        const insertId = result.insertId;
        this.ctx.body = {
            code: 1000,
            isSuccess: insertSuccess,
            insertId: insertId
        }
    }

    // 修改文章
    async updateArticle() {
        let tempArticle = this.ctx.request.body;
        const result = await this.app.mysql.update('article', tempArticle);
        const updateSuccess = result.affectedRows === 1;
        this.ctx.body = {
            code: 1000,
            isSuccess: updateSuccess
        }
    }

    // 获得文章列表
    async getArticleList() {
        let sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            'article.part_count as part_count,' +
            'article.view_count as view_count,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %h:%mm:%ss' ) as addTime," +
            'type.typeName as typeName ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
            'ORDER BY article.id DESC ';
        const resList = await this.app.mysql.query(sql);
        this.ctx.body = {
            code: 1000,
            list: resList,
            message: '查询成功'
        };
    }

    // 删除文章
    async delArticle() {
        // 获取get请求中url中的参数
        let id = this.ctx.params.id;
        const res = await this.app.mysql.delete('article', {id: id});
        this.ctx.body = {
            code: 1000,
            data: res
        };
    }

    // 修改文章
    async getArticleById() {
        let id = this.ctx.params.id;
        let sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            'article.article_content as article_content,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
            'article.view_count as view_count,' +
            'type.typeName as typeName,' +
            'type.id as typeId ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
            'WHERE article.id = ' + id;
        const result = await this.app.mysql.query(sql);
        if (id) {
            this.ctx.body = {
                code: 1000,
                data: result
            };
        } else {
            this.ctx.body = {
                data: '删除失败'
            };
        }
    }
}

module.exports = MainController;


