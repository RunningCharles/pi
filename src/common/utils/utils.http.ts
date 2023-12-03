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
//  Created by CharlesChen on 2023/12/02.
//  Copyright © 2023年 Tencent. All rights reserved.

import { lastValueFrom, map } from "rxjs";
import { HttpService } from "@nestjs/axios";

export interface HttpOptions {
  query?: {[key: string]: string};
  body?: {[key: string]: any};
  headers?: {[key: string]: string};
}

export class UtilsHttp {
  get(http: HttpService, url: string, ops: HttpOptions): Promise<any> {
    const options = {
      headers: ops.headers || {},
      params: ops.query || {},
    };
    return lastValueFrom(
      http.get(url, options).pipe(
        map(response => response.data)
      )
    );
  }

  post(http: HttpService, url: string, ops: HttpOptions): Promise<any> {
    const options = {
      headers: ops.headers || {},
      params: ops.query || {},
    };
    return lastValueFrom(
      http.post(url, ops.body, options).pipe(
        map(response => response.data)
      )
    );
  }
}

export const http = new UtilsHttp();
