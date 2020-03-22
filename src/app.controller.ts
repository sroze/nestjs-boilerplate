import * as crypto from 'crypto';
import { v4 } from 'uuid';

import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

function msleep(n) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/wait/:time')
  async wait(@Param('time') time: number) {
    await new Promise(resolve => {
      setTimeout(resolve, time);
    });

    return `Waited ${time} milli-seconds.`;
  }

  @Get('/sleep/:time')
  async sleep(@Param('time') time: number) {
    msleep(time);

    return `Slept ${time} milli-seconds.`;
  }

  @Get('/busy/:time')
  async busy(@Param('time') time: string) {
    const stopAt = Date.now() + parseInt(time);

    while (Date.now() <= stopAt) {
      crypto.createHmac('sha256', v4()).update(v4()).digest('hex');
    }

    return `Was busy for ${time}`;
  }
}
