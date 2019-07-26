/* eslint-disable no-unused-vars */
import path from 'path';
import merge from 'lodash/merge';

/* istanbul ignore next */
const requireProcessEnv = name => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
};

/* istanbul ignore next */
// if (process.env.NODE_ENV !== 'production') {
const dotenv = require('dotenv-safe');
dotenv.load({
  path: path.join(__dirname, '../.env'),
  sample: path.join(__dirname, '../.env.example')
});
// }

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 9000,
    ip: process.env.IP || '0.0.0.0',
    apiRoot: process.env.API_ROOT || '',
    masterKey: requireProcessEnv('MASTER_KEY'),
    jwtSecret: requireProcessEnv('JWT_SECRET'),
    websiteUrl: process.env.WEBSITE_URL || 'http://localhost:3000',
    mongo: {
      options: {
        useNewUrlParser: true,
        db: {
          safe: true
        }
      }
    }
  },
  test: {},
  development: {
    mongo: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost/triumph',
      options: {
        debug: false
      }
    }
  },
  production: {
    ip: process.env.IP || undefined,
    // port: process.env.PORT || 8080,
    mongo: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost/triumph'
    }
  }
};

module.exports = merge(config.all, config[config.all.env]);
export default module.exports;
