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


import { Module } from '@nestjs/common';
import { TestController } from 'src/1test/test.controller';
import { TestService } from 'src/1test/test.service';


@Module({
  imports: [],
  controllers: [TestController],
  providers: [TestService]
})
export class TestModule {}
