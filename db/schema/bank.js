const resolve = require('path').resolve;
const query = require(resolve('./db/query'))

module.exports.show_all = async function (app) {
    try {
        const res = await query.Select(app, 'headers."Banks"');
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }
}