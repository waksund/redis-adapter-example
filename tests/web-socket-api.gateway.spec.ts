import {redisSetup} from "./utils/redis.setup";
import { StartedTestContainer } from 'testcontainers';
import {INestApplication} from "@nestjs/common";
import {socketClient} from "@app/web-socket-client/web-socket-client";
import {Rooms} from "@cmn/rooms";
import {DataDto} from "@cmn/dto/data.dto";
import {WebSocketService} from "@app/web-socket-client/web-socket.service";
import {initClient, initServer} from "./utils/web-socket-api.utils";
import {DataService} from "@app/app/data/data.service";

describe('websocket api gateway', () => {
    let redisContainer: StartedTestContainer;
    let appServer1: INestApplication;
    let appServer2: INestApplication;
    let appClient: INestApplication;

    beforeAll(async () => {
        redisContainer = await redisSetup();

        const server1Port = 3000;
        appServer1 = await initServer(server1Port);

        const server2Port = 4000;
        appServer2 = await initServer(server2Port);

        appClient = await initClient(`http://localhost:${server1Port}`);
    }, 15 * 1000);

    afterAll(async () => {
        await Promise.all([
            appServer1.close(),
            appServer2.close(),
            appClient.close(),
            redisContainer.stop({ removeVolumes: true }),
        ]);
    }, 15 * 1000);

    describe('join', () => {
        it('should update data, if new data created', async () => {
            const first = new Promise((resolve) => {
                socketClient.once(Rooms.dataRoom, resolve);
            });

            const data: DataDto = {
                data: 'hello'
            };

            const dataService: DataService = appServer1.get(DataService);
            await dataService.createData(data);

            await first;

            const webSocketService = appClient.get(WebSocketService);

            expect(webSocketService.getData().data).toBe(data.data);
        });

        it('should update data, if new data created on other server', async () => {
            const first = new Promise((resolve) => {
                socketClient.once(Rooms.dataRoom, resolve);
            });

            const data: DataDto = {
                data: 'hello'
            };

            const dataService: DataService = appServer2.get(DataService);
            await dataService.createData(data);

            await first;

            const webSocketService = appClient.get(WebSocketService);

            expect(webSocketService.getData().data).toBe(data.data);
        });
    });
});