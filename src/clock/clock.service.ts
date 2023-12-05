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
import { Utils, gpio } from 'src/common/utils';
import { DIGs, Digit, HIGH, LEDs, LOW, kDigitValues } from 'src/clock/interfaces/clock.interface';

@Injectable()
export class ClockService implements OnModuleInit {
  private readonly logger = new Logger(ClockService.name);
  private leds: LEDs;
  private digs: DIGs;
  private digPins: Gpio[] = [];

  onModuleInit() {
    this.logger.info('on module init');

    this.leds = new LEDs();
    this.digs = new DIGs();
    this.digPins = [this.digs.one, this.digs.two, this.digs.three, this.digs.four];

    this.displayTime(new Date());
  }

  private displayTime(time: Date) {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const digit1 = Math.floor(hours / 10);
    const digit2 = hours % 10;
    const digit3 = Math.floor(minutes / 10);
    const digit4 = minutes % 10;
    this.displayDigit(this.digs.four, digit4);
  }

  private displayDigit(dig: Gpio, digit: Digit) {
    gpio.reset(this.digPins, HIGH);
    for (const item in kDigitValues[digit]) {
      const gpio = this.leds[item] as Gpio;
      gpio.write(kDigitValues[digit][item]);
    }
    dig.write(LOW);
  }
}
