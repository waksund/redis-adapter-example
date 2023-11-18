import {
    GenericContainer,
    StartedTestContainer,
    Wait,
} from 'testcontainers';

import { config } from '@cfg/config';

const REDIS_IMAGE = 'docker.io/bitnami/redis:7.2';
const REDIS_PORT = 6379;
const REDIS_PASSWORD = 'redis';
const REDIS_DB = 0;

export async function redisSetup(): Promise<StartedTestContainer> {
    const redisContainer = await new GenericContainer(REDIS_IMAGE)
        .withEnvironment({
            REDIS_PASSWORD,
            REDIS_DISABLE_COMMANDS: 'FLUSHDB,FLUSHALL',
        })
        .withExposedPorts(REDIS_PORT)
        .withWaitStrategy(Wait.forListeningPorts())
        .start();

    // (await redisContainer.logs())
    //   .on('data', (line) => console.log(line))
    //   .on('err', (line) => console.error(line))
    //   .on('end', () => console.log('Stream closed'));

    const redisPort = redisContainer.getMappedPort(REDIS_PORT);
    config.set('redis.host', 'localhost');
    config.set('redis.port', redisPort);
    config.set('redis.password', REDIS_PASSWORD);
    config.set('redis.db', REDIS_DB);

    return redisContainer;
}
