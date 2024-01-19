const resolve = require('path').resolve;
const query = require(resolve('./db/query'))

module.exports.show_all = async function (app) {
    try {
        const res = await query.Select(app, 'childs."Cost_Center"');
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports.save_new_costcenter = async function (app, values) {
    try {
        const res = await query.Insert(app, 'childs."Cost_Center"',
            ['title', 'payment', 'date', 'user_id', 'topic_id', 'bank_branch_id'],
            [values.title, values.payment, values.date, values.user_id, values.topic_id, values.bank_branch_id]
        );
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }   
}

module.exports.edit_costcenter = async function (app, values) {
    try {
        const res = await query.Update(app, 'childs."Cost_Center"',
            ['title', 'payment', 'date', 'topic_id', 'bank_branch_id'],
            [values.title, values.payment, values.date, values.topic_id, values.bank_branch_id],
            ['id', 'user_id'],
            [values.id, values.user_id]
        );
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }   
}

module.exports.delete_costcenter = async function (app, values) {
    try {
        const res = await query.Delete(app, 'childs."Cost_Center"',
            ['id', 'user_id'],
            [values.id, values.user_id]
        );
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }   
}