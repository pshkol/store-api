import {registerAs} from "@nestjs/config";

export default registerAs('config', () => {
    return {
        postgres: {
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            port: parseInt(process.env.POSTGRES_PORT),
            db: process.env.POSTGRES_DB,
            synchronize: Boolean(process.env.POSTGRES_SYNCHRONIZE),
            autoLoadEntities: Boolean(process.env.POSTGRES_AUTO_LOAD_ENTITIES),
        },
        jwtSecret: process.env.JWT_SECRET,
        port: parseInt(process.env.PORT),
    }
})