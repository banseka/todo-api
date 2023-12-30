import convict from 'convict';

// Define a schema
export const config = convict({
    env: {
        doc: 'The application environment.',
        format: ['production', 'development', 'staging'],
        default: 'development',
        env: 'NODE_ENV'
    },
    port: {
        doc: 'The port to bind.',
        format: 'port',
        default: 3000,
        env: 'PORT',
        arg: 'port'
    },
    db: {
        host: {
            doc: 'Database host name/IP',
            format: '*',
            default: '127.0.0.1:27017',
            env: 'DB_MONGO_HOST'
        },
        name: {
            doc: 'Database name',
            format: String,
            default: '',
            env: 'DB_MONGO_NAME'
        },
        auth: {
            user: {
                doc: 'Database user if any',
                format: String,
                default: '',
                env: 'DB_MONGO_USERNAME'
            },
            password: {
                doc: 'Database password if any',
                format: String,
                default: '',
                env: 'DB_MONGO_PASSWORD'
            }
        }
    },
    oauthSalt: {
        doc: 'Salt to encrypt Oauth tokens.',
        format: String,
        default: '',
        env: 'OAUTH_TOKEN_SALT',
        arg: 'oauth-salt'
    },
    oauthTTL: {
        doc: 'Token time to live.',
        format: Number,
        default: '',
        env: 'OAUTH_TTL',
        arg: 'oauth-ttl'
    },
    saltRounds: {
        doc: 'Nbr rounds for salt password encryption.',
        format: Number,
        default: 10,
        env: 'PASSWORDS_SALT_ROUNDS',
        arg: 'salt-rounds'
    },
    basePath: {
        doc: 'API base path.',
        format: String,
        default: ''
    },
});

// Load environment dependent configuration
const env = config.get('env');
config.loadFile('./src/config/' + env + '.json');

// Perform validation
config.validate({ allowed: 'strict' });
// export default config;












