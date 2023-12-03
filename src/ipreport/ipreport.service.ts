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
//  Created by CharlesChen on 2023/12/02.
//  Copyright © 2023年 Tencent. All rights reserved.

import * as os from 'os';
import { Injectable } from "@nestjs/common";
import { HttpService } from '@nestjs/axios';
import { Cron } from "@nestjs/schedule";
import { Utils, http } from "src/common/utils";
import { Logger } from 'src/common/logger/logger.service';

@Injectable()
export class IPReportService {
  private readonly logger = new Logger(IPReportService.name);

  constructor(private readonly http: HttpService) {}

  @Cron('*/5 * * * * *')
  onCron() { // 每 5s
    if (!Utils.isProd()) {
      return;
    }
    this.reportIp();
  }

  private reportIp() {
    const module = Utils.isProd() ? 'pi' : 'pi_dev';
    const ip = this.getIp();
    Promise.resolve().then(_ => {
      if (typeof ip !== 'string' || ip.length === 0) {
        return Promise.reject(new Error('ip address is invalid'));
      }
      const options = { query: { module }, body: { ip }};
      return http.post(this.http, 'http://43.157.39.4:7001/ipcache', options);
    }).catch(error => {
      this.logger.error('report ip failed, error:', error);
    });
  }

  private getIp(): string {
    const ifacesdict = os.networkInterfaces()
    for (const item in ifacesdict) {
      for (const { family, address, internal } of ifacesdict[item]) {
        if (family === 'IPv4' && address !== '127.0.0.1' && !internal) {
          return address
        }
      }
    }
    return null;
  }
}
