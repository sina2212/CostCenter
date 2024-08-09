const resolve = require('path').resolve;
const query = require(resolve('./db/query'))

//TODO: Fix replace branch into account

module.exports.show_all = async function (app) {
    try {
        const res = await query.Select(app, 'vouchers.incomes');
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports.save_new_income = async function (app, values) {
    try {
        const res = await query.Insert(app, 'vouchers.incomes',
            ['title', 'draft', 'date', 'user_id', 'topic_id', 'bank_branch_id'],
            [values.title, values.draft, values.date, values.user_id, values.topic_id, values.bank_branch_id]
        );
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }   
}

module.exports.edit_income = async function (app, values) {
    try {
        const res = await query.Update(app, 'vouchers.incomes',
            ['title', 'draft', 'date', 'topic_id', 'bank_branch_id'],
            [values.title, values.draft, values.date, values.topic_id, values.bank_branch_id],
            ['id', 'user_id'],
            [values.id, values.user_id]
        );
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }   
}

module.exports.delete_income = async function (app, values) {
    try {
        const res = await query.Delete(app, 'vouchers.incomes',
            ['id', 'user_id'],
            [values.id, values.user_id]
        );
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }   
}