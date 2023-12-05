import * as os from 'os';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Logger } from 'src/common/logger/logger.service';

@Injectable()
export class AppService implements OnModuleInit {
  private readonly logger = new Logger(AppService.name);

  onModuleInit() {
    this.logger.info('on module init');
    this.logger.info('arch:', os.arch());
    this.logger.info('type:', os.type());
    this.logger.info('platform:', os.platform());
    this.logger.info('release:', os.release());
    this.logger.info('hostname:', os.hostname());
  }

  handle(): Promise<any> {
    return Promise.resolve({code: 0, message: 'Hello World'});
  }
}
