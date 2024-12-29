const resolve = require('path').resolve;
const query = require(resolve('./db/query'))

module.exports.show_all = async function (app, values) {
    try {
        const res = await query.Select(app, 'basics.topics', ['user_id'], [values.user_id]);
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports.show_per_heeadline = async function (app, values) {
    try {
        const res = await query.Select(app, 'basics.topics', ['user_id', 'headline_id'], [values.user_id, values.headline_id]);
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports.save_new_topic = async function (app, values) {
    try {
        const res = await query.Insert(app, 'basics.topics',
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
        const res = await query.Update(app, 'basics.topics',
            ['name', 'headline_id'], [values.name, values.headline_id],
            ['id'], [values.id]
        );
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }   
}

module.exports.delete_topic = async function (app, values) {
    try {
        const res = await query.Delete(app, 'basics.topics',
            ['id'],
            [values.id]
        );
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }   
}