import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  handle(): Promise<any> {
    return Promise.resolve({code: 0, message: 'Hello World'});
  }
}
