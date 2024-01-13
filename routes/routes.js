const resolve = require('path').resolve;
module.exports = function(app)
{
    // These should come before other routes
    require(resolve('./modules/base/statics'))(app);
    require(resolve('./modules/headers/person'))(app);
    require(resolve('./modules/headers/bank'))(app);
}
