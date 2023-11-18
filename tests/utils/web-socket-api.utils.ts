import {INestApplication} from "@nestjs/common";
import {AppModule} from "@app/app/app.module";
import {RedisConnectionsKeeper} from "@app/app/web-socket-api/adapters/redis.connections.keeper";
import {RedisIoAdapter} from "@app/app/web-socket-api/adapters/redis.adapter";
import {WebSocketClientModule} from "@app/web-socket-client/web-socket-client.module";
import { Test } from '@nestjs/testing';

export async function initServer(port: number): Promise<INestApplication> {
    const module = await Test.createTestingModule({
        imports: [AppModule],
    })
        .compile();

    const app = module.createNestApplication();
    const connectionsKeeper = app.get(RedisConnectionsKeeper);
    app.useWebSocketAdapter(new RedisIoAdapter(app, connectionsKeeper));
    await app.listen(port);

    return app;
}

export async function initClient(serverUrl: string): Promise<INestApplication> {
    let resolve: (value: unknown) => void;
    const connectedPromise = new Promise((res) => {
        resolve = res;
    });

    const module = await Test.createTestingModule({
        imports: [WebSocketClientModule.forRoot({serverUrl, onConnected: () => resolve(0),})],
    })
        .compile();

    const app = module.createNestApplication();
    await app.init();
    await connectedPromise;

    return app;
}