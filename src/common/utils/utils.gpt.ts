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
//  Created by CharlesChen on 2023/12/06.
//  Copyright © 2023年 Tencent. All rights reserved.

import { OpenAI } from 'openai';
import { ChatCompletionMessage, ChatCompletionMessageParam } from 'openai/resources';

type Message = ChatCompletionMessageParam;
type CompletionMessage = ChatCompletionMessage;

export interface GptOptions {
  organization: string;
  apikey: string;
}

export class UtilsGPT {
  private openai: OpenAI;

  init(options: GptOptions) {
    this.openai = new OpenAI({
      apiKey: options.apikey,
      organization: options.organization
    });
  }

  chat(messages: Message[], model = 'gpt-3.5-turbo'): Promise<CompletionMessage> {
    return new Promise<CompletionMessage>((resolve, reject) => {
      Promise.resolve().then(_ => {
        return this.openai.chat.completions.create({
          model: model,
          messages: messages,
          temperature: 0.2,
        });
      }).then(completion => {
        if (!Array.isArray(completion.choices) || completion.choices.length === 0) {
          return Promise.reject('choices is invalid');
        }
        const content = completion.choices[0].message.content;
        if (typeof content !== 'string' || content.length === 0) {
          return Promise.reject('message is invalid');
        }
        resolve( completion.choices[0].message);
      }).catch(error => {
        reject(error);
      })
    });
  }
}

export const gpt = new UtilsGPT();
