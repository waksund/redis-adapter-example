import {Injectable} from "@nestjs/common";
import {WebSocketApiGateway} from "../web-socket-api/web-socket-api.gateway";
import {DataDto} from "@cmn/dto/data.dto";

@Injectable()
export class DataService{
    constructor(
        private readonly socketGateway: WebSocketApiGateway
    ) {
    }

    async createData(data: DataDto): Promise<void> {
        await this.socketGateway.updateData(data);
    }
}