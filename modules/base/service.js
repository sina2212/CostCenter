const express = require('express');

const resolve = require('path').resolve;

const bodyParser = require('body-parser');


module.exports.runCOSTCENTER = async function () { 
    // Initialized app
    app = await require(resolve('./modules/base/app'))();
    // Running Web Service
    app.listen(app.CC.Config.WebInterface.PORT, () => {
        console.log(`CC Web Interface is now running on ${app.CC.Config.WebInterface.URL }`);
    })
}
