const fs = require('fs')
require('dotenv').config();
const resolve = require('path').resolve;
const hostname = require('os').hostname();
const session = require('express-session');
const ConfigParser = require('configparser');

module.exports = function(app) 
{    
    app.CC.Config = {}
    // Read general config file address
    // Default: ./CC.cfg
    const generalConfigFile = resolve(process.env.generalConfigFile);
    // Check the file exists
    try {
        if (fs.existsSync(generalConfigFile)) {
            // Read parameters
            const cfg = new ConfigParser();
            cfg.read(generalConfigFile);
            // General
            app.CC.Config.General = {}
            app.CC.Config.General.Version = cfg.get('GENERAL', 'G_VERSION');
            app.CC.Config.General.Hostname = hostname;
            // WebInterace
            app.CC.Config.WebInterface = {}
            app.CC.Config.WebInterface.PORT = cfg.get('WEBINTERFACE', 'WI_PORT') || 8000;
            const URL = cfg.get('WEBINTERFACE', 'WI_URL');
            // Check / in full address
            if (URL.slice(-1) == '/') {
                app.CC.Config.WebInterface.URL = URL;
            } else {
                app.CC.Config.WebInterface.URL = URL + "/";
            }
            // Security
            app.CC.Config.Security = {};
            app.CC.Config.Security.HASH_DIFFICULTY = parseInt(cfg.get('SECURITY', 'SEC_HASH_DIFFICULTY'))
            app.CC.Config.Security.WEB_ACCESS_TOKEN_SECRET = cfg.get('SECURITY', 'SEC_WEB_ACCESS_TOKEN_SECRET')
            app.CC.Config.Security.WEB_ACCESS_TOKEN_MAX_REMEMBER_HOUR = parseInt(cfg.get('SECURITY', 'SEC_WEB_ACCESS_TOKEN_MAX_REMEMBER_HOUR'))
            app.CC.Config.Security.WEB_REFRESH_TOKEN_SECRET = cfg.get('SECURITY', 'SEC_WEB_REFRESH_TOKEN_SECRET')
            app.CC.Config.Security.APP_IOS_SESSION_TOKEN = cfg.get('SECURITY', 'SEC_APP_IOS_SESSION_TOKEN')
            app.CC.Config.Security.APP_ANDROID_SESSION_TOKEN = cfg.get('SECURITY', 'SEC_APP_ANDROID_SESSION_TOKEN')
            // PostgreSQL
            app.CC.Config.PostgreSQL = {};
            app.CC.Config.PostgreSQL.DB_USER = cfg.get('POSTGRESQL', 'PG_USER') || undefined;
            app.CC.Config.PostgreSQL.PG_PASSWORD = cfg.get('POSTGRESQL', 'PG_PASSWORD') || undefined;
            app.CC.Config.PostgreSQL.PG_HOST = cfg.get('POSTGRESQL', 'PG_HOST') || undefined;
            app.CC.Config.PostgreSQL.PG_DBNAME = cfg.get('POSTGRESQL', 'PG_DBNAME') || undefined;
            app.CC.Config.PostgreSQL.PG_PORT = cfg.get('POSTGRESQL', 'PG_PORT') || undefined;
            // Redis
            app.CC.Config.Redis = {};
            app.CC.Config.Redis.URL = cfg.get('REDIS', 'REDIS_URL') || undefined;
            app.CC.Config.Redis.DEFAULT_EXPIRES_SECONDS = parseInt(cfg.get('REDIS', 'REDIS_DEFAULT_EXPIRES_SECONDS')) || 2592000;
            // MAIL
            // app.CC.Config.MAIL = {};
            // app.CC.Config.MAIL.HOST = cfg.get('MAIL', 'MAIL_HOST') || undefined;
            // app.CC.Config.MAIL.PORT = parseInt(cfg.get('MAIL', 'MAIL_PORT')) || undefined;
            // app.CC.Config.MAIL.USER = cfg.get('MAIL', 'MAIL_USER') || undefined;
            // app.CC.Config.MAIL.PASS = cfg.get('MAIL', 'MAIL_PASS') || undefined;
            // app.CC.Config.MAIL.FROM = cfg.get('MAIL', 'MAIL_FROM') || undefined;
            // WebInterface
            // app.CC.WebInterface = {}
            // app.CC.WebInterface.Security = {}
            // API
            app.CC.API = {}
            // IS
            app.CC.API.IOS = {}
            app.CC.API.IOS.Security = {};
            // Android
            app.CC.API.Android = {}
            } else {
            console.log(`Cannot find general setting in ${generalConfigFile}`)
        }

    } catch(err) { console.error(err) }
}
