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
//  Created by CharlesChen on 2023/10/27.
//  Copyright © 2023年 Tencent. All rights reserved.

import { decamelize } from 'humps';
import { randomUUID } from 'crypto';

export enum ENV {
  dev = 'development',
  prod = 'production'
}

export interface SimpleParams {
  [key: string]: string | number;
}

export class Utils {
  static env(): string {
    return process.env.NODE_ENV === ENV.prod ? ENV.prod : ENV.dev;
  }

  static isDev(): boolean {
    return this.env() === ENV.dev;
  }

  static isProd(): boolean {
    return this.env() === ENV.prod;
  }

  static decamelize(params: SimpleParams | any): SimpleParams {
    const nparams: SimpleParams = {};
    for (const item of Object.keys(params)) {
      nparams[decamelize(item)] = params[item];
    }
    return nparams;
  }

  static uuid(separator: string = '-'): string {
    return randomUUID().replace(/-/g, separator);
  }

  static shortUuid(): string {
    return randomUUID().substring(0, 8);
  }

  static random(min: number, max: number): number {
    const range = max - min;
    const rand = Math.random();
    return min + Math.round(rand * range);
  }

  static isValidDate(d: any) {
    return d instanceof Date && !isNaN(d.getTime());
  }
}
