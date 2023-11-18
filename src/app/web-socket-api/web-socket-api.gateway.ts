import {ConnectedSocket, SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";
import {DataDto} from "@cmn/dto/data.dto";
import {Rooms} from "@cmn/rooms";

@WebSocketGateway()
export class WebSocketApiGateway {

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('join')
    async join(@ConnectedSocket() client: Socket): Promise<void> {
        console.log(`web-socket api join`);
        client.join(Rooms.dataRoom);
        client.emit('join', 'successful join');
    }

    async updateData(data: DataDto): Promise<void> {
        console.log(`web-socket api emit data '${JSON.stringify(data)}'`);
        this.server.to(Rooms.dataRoom).emit(Rooms.dataRoom, data);
    }
}