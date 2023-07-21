const express = require('express');
const resolve = require('path').resolve;
const bodyParser = require('body-parser');

module.exports = async function () {
    // Initialized app
    app = express();
    app.RCS = {}
    // Config app
    app.set('view engine', 'ejs');
    app.use(bodyParser.json() );
    app.use(bodyParser.urlencoded({ extended: true }));
    // Loading configurations
    require(resolve('./modules/base/config'))(app);
    // Mail Server
    // console.log("Connecting to Mail server...")
    // const mailServer = await require(resolve('./modules/mail/transporter'))(app);
    // if (!mailServer) {
    //     console.log("Cannot connect to Mail server...")
    //     return
    // }
    // Connect to DBs
    console.log("Connecting to db...")
    const isDBConnected = await require(resolve('./db/db_connectors'))(app);
    if (!isDBConnected) {
        console.log("Cannot connect to db...")
        return
    } else {
        // Setup Routes
        require(resolve('./routes/routes'))(app);
    }
    return app
}
