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
//  Created by CharlesChen on 2023/12/05.
//  Copyright © 2023年 Tencent. All rights reserved.
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

import { BinaryValue, Gpio } from 'onoff';
import { Utils } from 'src/common/utils';

export const HIGH = Gpio.HIGH;
export const LOW = Gpio.LOW;

export enum Digit {
  zero = 0, one = 1, two   = 2, three = 3, four = 4,
  five = 5, six = 6, seven = 7, eight = 7, nine = 9,
}

export const kDigitValues: {[key: number]: {[key: string]: BinaryValue}} = {};
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

export const kLedValues = { a: 26, b: 19, c: 13, d: 6, e: 5, f: 11, g: 9, dp: 10 };
export const kDigValues = { one: 12, two: 16, three: 20, four: 21 };

class GpioMock {
  write(value: BinaryValue): Promise<void> {
    return Promise.resolve();
  }
}

export class LEDs {
  readonly a?: Gpio;
  readonly b?: Gpio;
  readonly c?: Gpio;
  readonly d?: Gpio;
  readonly e?: Gpio;
  readonly f?: Gpio;
  readonly g?: Gpio;
  readonly dp?: Gpio;

  constructor() {
    for (const item of Object.keys(kLedValues)) {
      this[item] = Utils.isPi() ? new Gpio(kLedValues[item], 'low') : new GpioMock();
    }
  }
}

export class DIGs {
  one:   Gpio;
  two:   Gpio;
  three: Gpio;
  four:  Gpio;

  constructor() {
    for (const item of Object.keys(kDigValues)) {
      this[item] = Utils.isPi() ? new Gpio(kDigValues[item], 'low') : new GpioMock();
    }
  }
}