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

import { BinaryValue, Gpio } from 'onoff';
import { Injectable, OnModuleInit } from "@nestjs/common";
import { Logger } from 'src/common/logger/logger.service';
import { gpio } from 'src/common/utils';

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

const HIGH = Gpio.HIGH;
const LOW = Gpio.LOW;

enum Digit {
  zero = 0, one = 1, two   = 2, three = 3, four = 4,
  five = 5, six = 6, seven = 7, eight = 7, nine = 9,
}

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

const kLEDPins = Object.values(kLEDs);
const kDIGPins = Object.values(kDIGs);
const kAllPins = [].concat(Object.values(kLEDs)).concat(Object.values(kDIGs));

const kDigitValues: {[key: number]: {[key: string]: BinaryValue}} = {};
kDigitValues[Digit.zero]  = { a: HIGH, b: HIGH, c: HIGH, d: HIGH, e: HIGH, f: HIGH, g: LOW  };
kDigitValues[Digit.one]   = { a: LOW,  b: HIGH, c: HIGH, d: LOW,  e: LOW,  f: LOW,  g: LOW  };
kDigitValues[Digit.two]   = { a: HIGH, b: HIGH, c: LOW,  d: HIGH, e: HIGH, f: LOW,  g: HIGH };
kDigitValues[Digit.three] = { a: HIGH, b: HIGH, c: HIGH, d: HIGH, e: LOW,  f: LOW,  g: HIGH };
kDigitValues[Digit.four]  = { a: LOW,  b: HIGH, c: HIGH, d: LOW,  e: LOW,  f: HIGH, g: HIGH };
kDigitValues[Digit.five]  = { a: HIGH, b: LOW,  c: HIGH, d: HIGH, e: LOW,  f: HIGH, g: HIGH };
kDigitValues[Digit.six]   = { a: HIGH, b: LOW,  c: HIGH, d: HIGH, e: HIGH, f: HIGH, g: HIGH };
kDigitValues[Digit.seven] = { a: HIGH, b: HIGH, c: HIGH, d: LOW,  e: LOW,  f: LOW,  g: LOW  };
kDigitValues[Digit.eight] = { a: HIGH, b: HIGH, c: HIGH, d: HIGH, e: HIGH, f: HIGH, g: HIGH };
kDigitValues[Digit.nine]  = { a: HIGH, b: HIGH, c: HIGH, d: HIGH, e: LOW,  f: HIGH, g: HIGH };

@Injectable()
export class ClockService implements OnModuleInit {
  private readonly logger = new Logger(ClockService.name);

  onModuleInit() {
    this.logger.info('on module init');
    this.displayDigit(kDIGs.four, Digit.six);
  }

  private displayDigit(dig: Gpio, digit: Digit) {
    gpio.reset(kDIGPins, HIGH);
    for (const item in kDigitValues[digit]) {
      const gpio = kLEDs[item] as Gpio;
      gpio.write(kDigitValues[digit][item]);
    }
    dig.write(LOW);
  }
}
