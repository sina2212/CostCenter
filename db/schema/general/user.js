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
            [values.username, values.password, values.person_id]
        );
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports.change_information = async function (app, values) {
    try {
        const res = await query.Update(app, 'general.users',
            ['username', 'email', 'phone_number'], [values.username, values.email, values.phone_number],
            ['id'], [values.id]
        );
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports.change_password = async function (app, values) {
    try {
        const res = await query.Update(app, 'general.users',
            ['password'], [values.password],
            ['id'], [values.id]
        );
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }
}