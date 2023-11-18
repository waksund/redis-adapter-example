import {Module} from "@nestjs/common";
import {DataController} from "./data.controller";
import {DataService} from "./data.service";
import {WebSocketApiModule} from "../web-socket-api/web-socket-api.module";

@Module({
    controllers: [DataController],
    providers: [DataService],
    // imports: [WebSocketApiModule]
})
export class DataModule {}