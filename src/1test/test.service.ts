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

import { Injectable } from '@nestjs/common';
import { Gpio } from 'onoff';
import { Logger } from 'src/common/logger/logger.service';
import { TestBody, TestQuery } from 'src/1test/dtos/test.dto';

@Injectable()
export class TestService {
  private readonly logger = new Logger(TestService.name);

  handle(query: TestQuery, body: TestBody): Promise<any> {
    switch (query.func) {
      case 'pi': return this.piT();
      default: return Promise.resolve({ code: -1, msg: `${query.func} is not supported` });
    }
  }

  piT(): Promise<any> {
    const led = new Gpio(17, 'out');
    const button = new Gpio(4, 'in', 'both');
    button.watch((err, value) => {
      this.logger.info('button is touched:', value);
      led.writeSync(value);
    });
    return Promise.resolve({ code: 0, msg: 'OK' });
  }
}
