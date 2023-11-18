import { Redis } from 'ioredis';
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import {config} from "@cfg/config";

@Injectable()
export class RedisConnectionsKeeper implements OnModuleDestroy {
  private clients: Redis[] = [];

  async onModuleDestroy(): Promise<void> {
    for (const client of this.clients) {
      await client.quit();
    }
  }

  createConnect(): Redis {
    const client = new Redis({
      host: config.get('redis.host'),
      port: config.get('redis.port'),
      db: config.get('redis.db'),
      password: config.get('redis.password'),
    });
    client.on('error', (err) => {
      console.log(`redis client error ${`${err.message}`}`)
    });
    this.clients.push(client);

    return client;
  }
}
