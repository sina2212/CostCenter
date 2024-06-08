const { Client } = require('pg')

module.exports = async function(app)
{
    if (!app.CC.Config.PostgreSQL.DB_USER || 
        !app.CC.Config.PostgreSQL.PG_PASSWORD ||  
        !app.CC.Config.PostgreSQL.PG_HOST ||
        !app.CC.Config.PostgreSQL.PG_DBNAME ||
        !app.CC.Config.PostgreSQL.PG_PORT)
            return undefined;
    try {
        // Connecting PostgreSQL
        app.CC.Config.PostgreSQL.Client = undefined
        app.CC.Config.PostgreSQL.Client = new Client({
            user: app.CC.Config.PostgreSQL.DB_USER,
            password: app.CC.Config.PostgreSQL.PG_PASSWORD,
            host: app.CC.Config.PostgreSQL.PG_HOST,
            database: app.CC.Config.PostgreSQL.PG_DBNAME,
            port: app.CC.Config.PostgreSQL.PG_PORT
            })
        await app.CC.Config.PostgreSQL.Client.connect()
        console.log('PostgreSQL is connected!')
        // Connecting Redis
        // socket = {
        //     connectTimeout:5000,
        //     host:'127.0.0.1',
        //     keepAlive:0,
        //     noDelay:true,
        //     port:6379,
        // }
        // socket.keepAlive = 0
        // app.CC.Config.Redis.Client = createClient({ 
        //     url:  app.CC.Config.Redis.URL,
        //     socket: socket,
        // });
        // app.CC.Config.Redis.Client.on('error', (err) => {
        //     console.log('Redis Client Error', err)
        //     return undefined
        // });
        // await app.CC.Config.Redis.Client.connect();
        // console.log('Redis is connected!')
        return true
    } catch (err) {
        app.CC.Config.PostgreSQL.Client = undefined
        return undefined
    }
}
