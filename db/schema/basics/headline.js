const resolve = require('path').resolve;
const query = require(resolve('./db/query'))

module.exports.show_all = async function (app) {
    try {
        const res = await query.Select(app, 'basics.headlines');
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports.save_new_headline = async function (app, values) {
    try {
        const res = await query.Insert(app, 'basics.headlines',
            ['name', 'user_id'],
            [values.name, values.user_id]
        );
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }   
}

module.exports.edit_headline = async function (app, values) {
    try {
        const res = await query.Update(app, 'basics.headlines',
            ['name'],
            [values.name],
            ['id', 'user_id'],
            [values.id, values.user_id]
        );
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }   
}

module.exports.delete_headline = async function (app, values) {
    try {
        const res = await query.Delete(app, 'basics.headlines',
            ['id', 'user_id'],
            [values.id, values.user_id]
        );
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }   
}