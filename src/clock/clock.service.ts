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

const kSleepDuration = 10;

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

    this.displayTime();
  }

  private displayTime(): Promise<void> {
    return new Promise<void>((resolve, _) => {
      const time = new Date();
      const hours = time.getHours();
      const minutes = time.getMinutes();
      const digit1 = Math.floor(hours / 10);
      const digit2 = hours % 10;
      const digit3 = Math.floor(minutes / 10);
      const digit4 = minutes % 10;
      Promise.resolve().then(_ => {
        return this.displayDigit(this.digs.one, digit1);
      }).then(_ => {
        return this.sleep(kSleepDuration);
      }).then(_ => {
        return this.displayDigit(this.digs.two, digit2);
      }).then(_ => {
        return this.sleep(kSleepDuration);
      }).then(_ => {
        return this.displayDigit(this.digs.three, digit3);
      }).then(_ => {
        return this.sleep(kSleepDuration);
      }).then(_ => {
        return this.displayDigit(this.digs.four, digit4);
      }).then(_ => {
        return this.sleep(kSleepDuration);
      }).then(_ => {
        return this.displayTime();
      }).then(_ => {
        resolve();
      }).catch(error => {
        this.logger.error('dispay time failed, error:', error);
      });
    });
  }

  private displayDigit(dig: Gpio, digit: Digit): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      Promise.resolve().then(_ => {
        return gpio.reset(this.digPins, HIGH);
      }).then(_ => {
        const values = kDigitValues[digit];
        const promises = Object.keys(values).map(item => {
          const gpio = this.leds[item] as Gpio;
          return gpio.write(values[item]);
        });
        return Promise.all(promises);
      }).then(_ => {
        return dig.write(LOW);
      }).then(_ => {
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  }

  private sleep(ms: number): Promise<void> {
    return new Promise<void>((resolve, _) => {
      setTimeout(resolve, ms);
    });
  }
}
