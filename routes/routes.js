const resolve = require('path').resolve;
module.exports = function(app)
{
    // These should come before other routes
    require(resolve('./modules/base/statics'))(app);
    // require(resolve('./modules/security/aaa'))(app);
    // require(resolve('./modules/company/general/index'))(app);
    // require(resolve('./modules/company/general/projects'))(app);
    // require(resolve('./modules/company/general/entities'))(app);
    // require(resolve('./modules/company/general/personnels'))(app);
    // require(resolve('./modules/company/general/materials_and_services'))(app);
    // require(resolve('./modules/company/security/aaa'))(app);
    // require(resolve('./modules/IO/local'))(app);
}
