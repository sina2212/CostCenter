const resolve = require('path').resolve;
const query = require(resolve('./db/query'))

module.exports.check_unique = async function (app, username) {
    try {
        const query_ = `select username from general.users where username = $1`;
        const res = await query.Query(app, query_, [username]);
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports.save_new_user = async function (app, values) {
    try {
        const res = await query.Insert(app, 'general.users',
        ['username', 'password', 'email', 'phone_number', 'person_id'],
        [values.username, values.password, values.email, values.phone_number, values.person_id]);
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }   
}

module.exports.change_username = async function (app, values) {
    try {
        const res = await query.update(app, 'general.users',
        ['username'], [values.username],
        ['id'], [values.id]);
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }   
}

module.exports.change_password = async function (app, values) {
    try {
        const res = await query.update(app, 'general.users',
        ['password'], [values.password],
        ['id'], [values.id]);
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }   
}

module.exports.change_information = async function (app, values) {
    try {
        const res = await query.update(app, 'general.users',
        ['email', 'phone_number'], [values.email, values.phone_number],
        ['id'], [values.id]);
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }   
}