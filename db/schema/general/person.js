const resolve = require('path').resolve;
const query = require(resolve('./db/query'))

module.exports.show_all = async function (app) {
    try {
        const res = await query.Select(app, 'general."persons"');
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports.save_new_person = async function (app, values) {
    try {
        const res = await query.Insert(app, 'general."persons"', ['first_name', 'last_name'], [values.first_name, values.last_name]);
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }   
}