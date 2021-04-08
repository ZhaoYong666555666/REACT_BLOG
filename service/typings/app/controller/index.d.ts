// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome = require('../../../app/controller/home');
import ExportAdminMain = require('../../../app/controller/admin/main');
import ExportDefaultHome = require('../../../app/controller/default/home');

declare module 'egg' {
  interface IController {
    home: ExportHome;
    admin: {
      main: ExportAdminMain;
    }
    default: {
      home: ExportDefaultHome;
    }
  }
}
