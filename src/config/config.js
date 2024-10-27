const { configDotenv } = require('dotenv');

configDotenv();

const config = {
    webdav_url: process.env.WEBDAV_URL,
    webdav_url_public: process.env.WEBDAV_URL_PUBLIC,
    webdav_username: process.env.WEBDAV_USERNAME,
    webdav_password: process.env.WEBDAV_PASSWORD,
};

module.exports = config;