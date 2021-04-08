'use strict';

/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// };

// 链接mysql数据库
exports.mysql = {
    enable: true,
    package: 'egg-mysql'
};

// 进行跨域访问
exports.cors = {
    enable: true,
    package: 'egg-cors'
};
