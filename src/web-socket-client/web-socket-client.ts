import {Injectable, OnModuleDestroy, OnModuleInit} from "@nestjs/common";
import { io, Socket } from 'socket.io-client';
import {Options} from "./options";
import {Rooms} from "@cmn/rooms";
import {WebSocketService} from "@app/web-socket-client/web-socket.service";
import {DataDto} from "@cmn/dto/data.dto";

export let socketClient: Socket;

@Injectable()
export class WebSocketClient implements OnModuleInit, OnModuleDestroy {
    private readonly socket: Socket;

    private readonly onConnected?: () => void;

    constructor(
        options: Options,
        private readonly webSocketService: WebSocketService
    ) {
        this.socket = io(options.serverUrl,{
            reconnection: true,
            reconnectionDelay: 2000,
            autoConnect: true
        });

        socketClient = this.socket;

        this.onConnected = options.onConnected;

        this.socket.on('connect_error', (err) => {
            console.log('connect_error: ', undefined, err)
        });
    }

    onModuleInit(): void {
        this.connect();
    }

    onModuleDestroy(): void {
        this.socket.disconnect();
    }

    connect(): void{
        this.socket.on('join', (body: string): void => {
            if (this.onConnected) {
                this.onConnected();
            }

            console.log(`join message '${body}'`);
        });

        this.socket.on(Rooms.dataRoom, (data: DataDto): void => {
            console.log(`web-socket client on data '${JSON.stringify(data)}'`);
            this.webSocketService.updateData(data);
        });

        this.socket.on('connect', async () => {
            this.socket.emit('join');
            console.log('connected')
        });
    }

}