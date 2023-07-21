const fs = require('fs')
require('dotenv').config();
const resolve = require('path').resolve;
const hostname = require('os').hostname();
const session = require('express-session');
const ConfigParser = require('configparser');

module.exports = function(app) 
{    
    app.RCS.Config = {}
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
            app.RCS.Config.General = {}
            app.RCS.Config.General.Version = cfg.get('GENERAL', 'G_VERSION');
            app.RCS.Config.General.Hostname = hostname;
            // WebInterace
            app.RCS.Config.WebInterface = {}
            app.RCS.Config.WebInterface.PORT = cfg.get('WEBINTERFACE', 'WI_PORT') || 8000;
            const URL = cfg.get('WEBINTERFACE', 'WI_URL');
            // Check / in full address
            if (URL.slice(-1) == '/') {
                app.RCS.Config.WebInterface.URL = URL;
            } else {
                app.RCS.Config.WebInterface.URL = URL + "/";
            }
            // Security
            app.RCS.Config.Security = {};
            app.RCS.Config.Security.HASH_DIFFICULTY = parseInt(cfg.get('SECURITY', 'SEC_HASH_DIFFICULTY'))
            app.RCS.Config.Security.WEB_ACCESS_TOKEN_SECRET = cfg.get('SECURITY', 'SEC_WEB_ACCESS_TOKEN_SECRET')
            app.RCS.Config.Security.WEB_ACCESS_TOKEN_MAX_REMEMBER_HOUR = parseInt(cfg.get('SECURITY', 'SEC_WEB_ACCESS_TOKEN_MAX_REMEMBER_HOUR'))
            app.RCS.Config.Security.WEB_REFRESH_TOKEN_SECRET = cfg.get('SECURITY', 'SEC_WEB_REFRESH_TOKEN_SECRET')
            app.RCS.Config.Security.APP_IOS_SESSION_TOKEN = cfg.get('SECURITY', 'SEC_APP_IOS_SESSION_TOKEN')
            app.RCS.Config.Security.APP_ANDROID_SESSION_TOKEN = cfg.get('SECURITY', 'SEC_APP_ANDROID_SESSION_TOKEN')
            // PostgreSQL
            app.RCS.Config.PostgreSQL = {};
            app.RCS.Config.PostgreSQL.DB_USER = cfg.get('POSTGRESQL', 'PG_USER') || undefined;
            app.RCS.Config.PostgreSQL.PG_PASSWORD = cfg.get('POSTGRESQL', 'PG_PASSWORD') || undefined;
            app.RCS.Config.PostgreSQL.PG_HOST = cfg.get('POSTGRESQL', 'PG_HOST') || undefined;
            app.RCS.Config.PostgreSQL.PG_DBNAME = cfg.get('POSTGRESQL', 'PG_DBNAME') || undefined;
            app.RCS.Config.PostgreSQL.PG_PORT = cfg.get('POSTGRESQL', 'PG_PORT') || undefined;
            // Redis
            app.RCS.Config.Redis = {};
            app.RCS.Config.Redis.URL = cfg.get('REDIS', 'REDIS_URL') || undefined;
            app.RCS.Config.Redis.DEFAULT_EXPIRES_SECONDS = parseInt(cfg.get('REDIS', 'REDIS_DEFAULT_EXPIRES_SECONDS')) || 2592000;
            // MAIL
            // app.RCS.Config.MAIL = {};
            // app.RCS.Config.MAIL.HOST = cfg.get('MAIL', 'MAIL_HOST') || undefined;
            // app.RCS.Config.MAIL.PORT = parseInt(cfg.get('MAIL', 'MAIL_PORT')) || undefined;
            // app.RCS.Config.MAIL.USER = cfg.get('MAIL', 'MAIL_USER') || undefined;
            // app.RCS.Config.MAIL.PASS = cfg.get('MAIL', 'MAIL_PASS') || undefined;
            // app.RCS.Config.MAIL.FROM = cfg.get('MAIL', 'MAIL_FROM') || undefined;
            // WebInterface
            // app.RCS.WebInterface = {}
            // app.RCS.WebInterface.Security = {}
            // API
            app.RCS.API = {}
            // IS
            app.RCS.API.IOS = {}
            app.RCS.API.IOS.Security = {};
            // Android
            app.RCS.API.Android = {}
            // CDN
            app.RCS.Config.Parsaspace = {}
            app.RCS.Config.Parsaspace.AUTH_TOKEN = `Bearer ${cfg.get('PARSASPACE', 'PS_AUTH_TOKEN')}` || undefined;
        } else {
            console.log(`Cannot find general setting in ${generalConfigFile}`)

        }

    } catch(err) { console.error(err) }
}
