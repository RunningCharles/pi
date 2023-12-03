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
//  Created by CharlesChen on 2023/12/03.
//  Copyright © 2023年 Tencent. All rights reserved.

import { Gpio } from 'onoff';
import { Injectable, OnModuleInit } from "@nestjs/common";
import { Logger } from 'src/common/logger/logger.service';

/* 
        A(11)
     +---------+
     |         |
F(10)|         |B(7)
     |         |
     +---G(5)--+
     |         |
 E(1)|         |C(4)
     |         |
     +---------+    * DP(3)
         D(2)

------------------------------------------------------

                         -----
    +-----+     +-----+         +-----+     +-----+
    |     |     |     |    *    |     |     |     |
    +-----+     +-----+         +-----+     +-----+
    |     |     |     |    *    |     |     |     |
    +-----+ *   +-----+ *       +-----+ *   +-----+ *
    ---------   ---------       ---------   ---------
     DIG(12)     DIG(9)          DIG(8)      DIG(6)
*/

const kLEDs = {
  a:  new Gpio(26, 'low'),
  b:  new Gpio(19, 'low'),
  c:  new Gpio(13, 'low'),
  d:  new Gpio(6,  'low'),
  e:  new Gpio(5,  'low'),
  f:  new Gpio(11, 'low'),
  g:  new Gpio(9,  'low'),
  dp: new Gpio(10, 'low'),
}

const kDIGs = {
  one:   new Gpio(12, 'low'),
  two:   new Gpio(16, 'low'),
  three: new Gpio(20, 'low'),
  four:  new Gpio(21, 'low'),
}

@Injectable()
export class ClockService implements OnModuleInit {
  private readonly logger = new Logger(ClockService.name);

  onModuleInit() {

    this.logger.info('on module init');
  }
}
