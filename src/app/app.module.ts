import {Module} from "@nestjs/common";
import {WebSocketApiModule} from "./web-socket-api/web-socket-api.module";
import {DataController} from "./data/data.controller";
import {DataService} from "./data/data.service";

@Module({
    imports: [WebSocketApiModule],
    controllers: [DataController],
    providers: [DataService]
})
export class AppModule { }