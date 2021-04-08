'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        const {ctx} = this;
        ctx.body = 'hi, egg';
    }

    async list() {
        const {ctx} = this;
        ctx.body = '<h1>我现在努力的，都是为了以后更好的回报</h1>'
    }
}

module.exports = HomeController;
