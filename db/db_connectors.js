const { Client } = require('pg')
const { createClient } = require('redis');

module.exports = async function(app)
{
    if (!app.RCS.Config.PostgreSQL.DB_USER || 
        !app.RCS.Config.PostgreSQL.PG_PASSWORD ||  
        !app.RCS.Config.PostgreSQL.PG_HOST ||
        !app.RCS.Config.PostgreSQL.PG_DBNAME ||
        !app.RCS.Config.PostgreSQL.PG_PORT ||
        !app.RCS.Config.Redis.URL)
            return undefined;
    try {
        // Connecting PostgreSQL
        app.RCS.Config.PostgreSQL.Client = undefined
        app.RCS.Config.PostgreSQL.Client = new Client({
            user: app.RCS.Config.PostgreSQL.DB_USER,
            password: app.RCS.Config.PostgreSQL.PG_PASSWORD,
            host: app.RCS.Config.PostgreSQL.PG_HOST,
            database: app.RCS.Config.PostgreSQL.PG_DBNAME,
            port: app.RCS.Config.PostgreSQL.PG_PORT
            })
        await app.RCS.Config.PostgreSQL.Client.connect()
        console.log('PostgreSQL is connected!')
        // Connecting Redis
        socket = {}
        socket.keepAlive = 0
        app.RCS.Config.Redis.Client = createClient({ 
            url:  app.RCS.Config.Redis.URL,
            socket: socket,
        });
        app.RCS.Config.Redis.Client.on('error', (err) => {
            console.log('Redis Client Error', err)
            return undefined
        });
        await app.RCS.Config.Redis.Client.connect();
        console.log('Redis is connected!')
        return true
    } catch (err) {
        app.RCS.Config.PostgreSQL.Client = undefined
        return undefined
    }
}
