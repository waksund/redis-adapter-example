import {AppModule} from "./app/app.module";
import {NestFactory} from "@nestjs/core";
import {config} from "@cfg/config";
import {RedisConnectionsKeeper} from "@app/app/web-socket-api/adapters/redis.connections.keeper";
import {RedisIoAdapter} from "@app/app/web-socket-api/adapters/redis.adapter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        bufferLogs: true,
    });
    const connectionsKeeper = app.get(RedisConnectionsKeeper);
    app.useWebSocketAdapter(new RedisIoAdapter(app, connectionsKeeper));
    await app.listen(config.get('app.port'));
};

void bootstrap();