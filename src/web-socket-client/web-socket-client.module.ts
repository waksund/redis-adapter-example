import {DynamicModule, Global, Module} from "@nestjs/common";
import {Options} from "./options";
import {WebSocketClient} from "./web-socket-client";
import {WebSocketService} from "@app/web-socket-client/web-socket.service";

@Global()
@Module({})
export class WebSocketClientModule{
    static forRoot(options: Options): DynamicModule {
        return {
            module: WebSocketClientModule,
            imports: [WebSocketClientModule],
            providers: [
                {
                    provide: Options,
                    useValue: options
                },
                WebSocketClient,
                WebSocketService
            ],
            exports: [WebSocketService]
        };
    };
};