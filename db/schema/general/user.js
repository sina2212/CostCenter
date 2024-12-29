const resolve = require('path').resolve;
const query = require(resolve('./db/query'))

module.exports.show_all = async function (app) {
    try {
        const res = await query.Select(app, 'general.users');
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports.check_unique = async function (app, values) {
    try {
        // const query_ = `select username from general.users where username = $1 or person_id = $2`;
        const res = await query.Select(app, 'general.users', ['username', 'person_id'], [values.username, values.person_id], 'OR')
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports.save_new_user = async function (app, values) {
    try {
        const res = await query.Insert(app, 'general.users',
        ['username', 'password', 'person_id'],
        [values.username, values.password, values.person_id]);
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