/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1599120272274_8252';

    // add your middleware config here
    config.middleware = [];

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };

    // 配置数据库,启用php Study
    config.mysql = {
        // database configuration
        client: {
            // host
            host: 'localhost',
            // port
            port: '3306',
            // username
            user: 'root',
            // password
            password: '12345678',
            // database
            database: 'react_blog',
        },
        // load into app, default is open
        app: true,
        // load into agent, default is close
        agent: false,
    };

    // 解决跨域问题
    config.security = {
        csrf: {enable: false},
        domainWhiteList: ['*']
    };
    // config.cors = {
    //     origin: '*',        // 允许哪些域名可以访问，*代表所有的
    //     credentials: true,  //允许Cook可以跨域
    //     allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
    // };

    config.cors = {
        origin: 'http://localhost:3000', //只允许这个域进行访问接口
        credentials: true,   // 开启认证，允许Cook，可以跨域
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
    };

    return {
        ...config,
        ...userConfig,
    };
};
