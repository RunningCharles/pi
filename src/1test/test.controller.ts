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


import { Controller, Post, Get, HttpCode, Query, Body } from '@nestjs/common';
import { TestQuery, TestBody } from 'src/1test/dtos/test.dto';
import { TestService } from 'src/1test/test.service';
import { Logger } from 'src/common/logger/logger.service';
import { Utils } from 'src/common/utils';

@Controller('test')
export class TestController {
  private readonly logger = new Logger(TestController.name);

  constructor(private readonly service: TestService) {}

  @Get()
  @HttpCode(200)
  get(@Query() query: TestQuery): Promise<any> {
    this.logger.info(`received get request, query: ${JSON.stringify(query)}`);
    if (Utils.isProd()) {
      return Promise.resolve({ code: 404, message: 'Not Found'});
    }
    return this.service.handle(query, null);
  }

  @Post()
  @HttpCode(200)
  post(@Query() query: TestQuery, @Body() body: TestBody): Promise<any>  {
    this.logger.info(`received post request, query: ${JSON.stringify(query)}\nbody: ${body}`);
    if (Utils.isProd()) {
      return Promise.resolve({ code: 404, message: 'Not Found'});
    }
    return this.service.handle(query, body);
  }
}
