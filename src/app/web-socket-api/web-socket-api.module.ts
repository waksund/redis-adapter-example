import {Module} from "@nestjs/common";
import {WebSocketApiGateway} from "./web-socket-api.gateway";
import {RedisConnectionsKeeper} from "@app/app/web-socket-api/adapters/redis.connections.keeper";

@Module({
    providers: [ WebSocketApiGateway, RedisConnectionsKeeper ],
    exports: [ WebSocketApiGateway ]
})
export class WebSocketApiModule {}