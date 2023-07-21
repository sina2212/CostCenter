const express = require('express');

const resolve = require('path').resolve;

const bodyParser = require('body-parser');


module.exports.runCOSTCENTER = async function () { 
    // Initialized app
    app = await require(resolve('./modules/base/app'))();
    // Running Web Service
    app.listen(app.RCS.Config.WebInterface.PORT, () => {
        console.log(`RCS Web Interface is now running on ${app.RCS.Config.WebInterface.URL }`);
    })
}
