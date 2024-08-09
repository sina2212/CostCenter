const resolve = require('path').resolve;
const query = require(resolve('./db/query'))

module.exports.show_all = async function (app) {
    try {
        const res = await query.Select(app, 'childs."Topics"');
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports.save_new_topic = async function (app, values) {
    try {
        const res = await query.Insert(app, 'childs."Topics"',
            ['name', 'headline_id', 'user_id'],
            [values.name, values.headline_id, values.user_id]
        );
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }   
}

module.exports.edit_topic = async function (app, values) {
    try {
        const res = await query.Update(app, 'childs."Topics"',
            ['name', 'headline_id'],
            [values.name, values.headline_id],
            ['id', 'user_id'],
            [values.id, values.user_id]
        );
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }   
}

module.exports.delete_topic = async function (app, values) {
    try {
        const res = await query.Delete(app, 'childs."Topics"',
            ['id', 'user_id'],
            [values.id, values.user_id]
        );
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }   
}