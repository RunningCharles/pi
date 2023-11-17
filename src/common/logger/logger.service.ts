//
//
//      ┏┛ ┻━━━━━┛ ┻┓
//      ┃　　　　　　 ┃
//      ┃　　　━　　　┃
//      ┃　┳┛　  ┗┳　┃
//      ┃　　　　　　 ┃
//      ┃　　　┻　　　┃
//      ┃　　　　　　 ┃
//      ┗━┓　　　┏━━━┛
//        ┃　　　┃   神兽保佑
//        ┃　　　┃   代码无BUG！
//        ┃　　　┗━━━━━━━━━┓
//        ┃　　　　　　　    ┣┓
//        ┃　　　　         ┏┛
//        ┗━┓ ┓ ┏━━━┳ ┓ ┏━┛
//          ┃ ┫ ┫   ┃ ┫ ┫
//          ┗━┻━┛   ┗━┻━┛
//
//  Created by CharlesChen on 2023/02/10.
//  Copyright © 2023年 Tencent. All rights reserved.

import { Injectable, Optional } from '@nestjs/common';
import { configure, getLogger } from 'log4js';
import { Utils } from 'src/common/utils';

export const CONSOLE_CONF = {
  type: 'console',
};

export const FILE_CONF = {
  type: 'dateFile',
  filename: 'logs/sophon_radar.log',
  pattern: "yyyy-MM-dd",
  keepFileExt: true,
  alwaysIncludePattern: true,
  backups: 30,
};

configure({
  appenders: {
    append: Utils.isDev() ? CONSOLE_CONF : FILE_CONF,
  },
  categories: {
    default: {
      appenders: ['append'],
      level: process.env.log_level || 'info',
    },
  },
});

const log4jsLogger = getLogger();

@Injectable()
export class Logger {
  private readonly logger = log4jsLogger;
  private context: string;

  constructor(@Optional() context = 'Default') {
    this.context = context;
  }

  private call(level: string, message: any, ...args: any[]) {
    this.logger[level](`[${this.context}]`, message, ...args);
  }

  log(message: any, ...args: any[]) {
    this.call('info', message, ...args);
  }

  info(message: any, ...args: any[]) {
    this.call('info', message, ...args);
  }

  error(message: any, ...args: any[]) {
    this.call('error', message, ...args);
  }

  warn(message: any, ...args: any[]) {
    this.call('warn', message, ...args);
  }

  debug(message: any, ...args: any[]) {
    this.call('debug', message, ...args);
  }
}
