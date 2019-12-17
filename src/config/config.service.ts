import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';

export interface EnvConfig {
    [key: string]: string;
}

export class ConfigService {
    private readonly envConfig: EnvConfig;

    constructor() {
        const config = fs.existsSync('.env') ? dotenv.parse(fs.readFileSync('.env')) : this.parseEnv();
        this.envConfig = this.validateInput(config);
    }

    private parseEnv(): EnvConfig {
        const ENV_VARIABLES = [
            'NODE_ENV',
            'HOST',
            'PORT',
            'API_KEY',
            'MONGODB_URI',
            'JWT_EXPIRES',
        ];
        return ENV_VARIABLES.reduce((obj, variable) => {
            obj[variable] = process.env[variable];
            return obj;
        }, {});
    }

    private validateInput(envConfig: EnvConfig): EnvConfig {
        const envVarsSchema: Joi.ObjectSchema = Joi.object({
            NODE_ENV: Joi.string()
                .valid('development', 'production', 'testing')
                .default('development'),
            HOST: Joi.string().default('localhost'),
            PORT: Joi.number().default(3000),
            API_KEY: Joi.string().min(30).max(50).required(),
            MONGODB_URI: Joi.string().default('mongodb://localhost/nest'),
            JWT_EXPIRES: Joi.string().default('1h'),
        });
        const { error, value: validatedEnvConfig } = envVarsSchema.validate(envConfig);
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }

    get(key: string): string {
        return this.envConfig[key];
    }
}
