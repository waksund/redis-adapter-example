import { createAdapter } from '@socket.io/redis-adapter';
import { ServerOptions } from 'socket.io';
import { INestApplication } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';

import { RedisConnectionsKeeper } from './redis.connections.keeper';

export class RedisIoAdapter extends IoAdapter {
  private readonly adapterConstructor: ReturnType<typeof createAdapter>;

  constructor(app: INestApplication, connectionKeeper: RedisConnectionsKeeper) {
    super(app);

    const subClient = connectionKeeper.createConnect();
    const pubClient = connectionKeeper.createConnect();

    this.adapterConstructor = createAdapter(pubClient, subClient);
  }

  createIOServer(port: number, options?: ServerOptions): unknown {
    const server = super.createIOServer(port, options);

    server.adapter(this.adapterConstructor);

    return server;
  }
}
