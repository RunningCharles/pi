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
import { Logger } from 'src/common/logger/logger.service';
import { TestBody, TestQuery } from 'src/1test/dtos/test.dto';
import { gpt } from 'src/common/utils';

@Injectable()
export class TestService {
  private readonly logger = new Logger(TestService.name);

  handle(query: TestQuery, body: TestBody): Promise<any> {
    gpt.chat([{ role: 'user', content: '树莓派是啥'}]).then(message => {
      this.logger.info('content:', message.content);
    }).catch(error => {
      this.logger.error(error);
    });
    switch (query.func) {
      default: return Promise.resolve({ code: -1, msg: `${query.func} is not supported` });
    }
  }
}
