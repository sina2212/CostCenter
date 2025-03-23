const resolve = require('path').resolve;
const query = require(resolve('./db/query'))

module.exports.show_all = async function (app) {
    try {
        const res = await query.Select(app, 'general.persons');
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports.save_new_person = async function (app, values) {
    try {
        const res = await query.Insert(app, 'general.persons', ['first_name', 'last_name'], [values.first_name, values.last_name]);
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }   
}

module.exports.update_person = async function (app, values) {
    try {
        const person_id = await query.Select(app,
            'general.users',
            ['username'],
            [values.user_name]
        );
        const res = await query.Update(app, 'general.persons',
            ['first_name', 'last_name'], [values.first_name, values.last_name],
            ['id'], [person_id.rows[0]['person_id']]
        );
        return res;
    } catch (error) {
        console.log(error);
        return false;
    }
}