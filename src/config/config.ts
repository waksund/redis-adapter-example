import {createProfiguration} from "@golevelup/profiguration";

type Config = {
    redis: {
        host: string;
        port: number;
        db: number;
        password: string;
    };
    app: {
        port: number;
    };
};

export const config = createProfiguration<Config>(
    {
        redis: {
            host: {
                default: '',
                env: 'REDIS_HOST',
            },
            port: {
                default: 6379,
                env: 'REDIS_PORT',
            },
            db: {
                default: 0,
                env: 'REDIS_DB',
            },
            password: {
                default: '',
                env: 'REDIS_PASS',
                sensitive: true,
            },
        },
        app: {
            port: {
                default: 3000,
                format: 'port',
                env: 'APP_PORT',
            },
        },
    },
    {
        strict: false,
        configureEnv: (env = 'local') => ({
            strict: false,
            files: [
                `.env.${env}`,
            ],
        }),
    },
);
