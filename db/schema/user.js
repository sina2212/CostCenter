const resolve = require('path').resolve;
const query = require(resolve('./db/query'))

module.exports.check_unique = async function (app, username) {
    try {
        const query_ = `select username from childs."Users" where username = $1`;
        const res = await query.Query(app, query_, [username]);
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports.save_new_user = async function (app, values) {
    try {
        const res = await query.Insert(app, 'childs."Users"',
        ['username', 'password', 'person_id'],
        [values.username, values.password, values.person_id]);
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }   
}