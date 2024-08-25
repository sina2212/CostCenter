const resolve = require('path').resolve;
module.exports = function(app)
{
    // These should come before other routes
    require(resolve('./modules/base/statics'))(app);
    require(resolve('./modules/general/person'))(app);
    require(resolve('./modules/general/user'))(app);
    // require(resolve('./modules/headers/headline'))(app);
    // require(resolve('./modules/headers/topic'))(app);
    // require(resolve('./modules/headers/income'))(app);
    // require(resolve('./modules/headers/costcenter'))(app);
    require(resolve('./modules/general/bank'))(app);
    // require(resolve('./modules/headers/bankbranch'))(app);
}
