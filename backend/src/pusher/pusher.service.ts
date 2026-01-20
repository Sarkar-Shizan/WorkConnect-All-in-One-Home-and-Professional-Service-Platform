import { Injectable } from '@nestjs/common';
import Pusher from 'pusher';

@Injectable()
export class PusherService {
  private pusher: Pusher;

  constructor() {
    // Hardcoded credentials
    const appId = '2100101';
    const key = '1006fe90538ff126ede4';
    const secret = '210d616ae1f17f094437';
    const cluster = 'ap1';

    this.pusher = new Pusher({
      appId,
      key,
      secret,
      cluster,
      useTLS: true, // secure https connection
    });
  }

  async trigger(channel: string, event: string, data: any) {
    await this.pusher.trigger(channel, event, data);
  }
}
