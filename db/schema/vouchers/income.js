const resolve = require('path').resolve;
const query = require(resolve('./db/query'))

module.exports.show_all = async function (app) {
    try {
        const res = await query.Select(app, 'vouchers.incomes', ['user_id'], [values.user_id]);
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports.show_per_topic = async function (app) {
    try {
        const res = await query.Select(app, 'vouchers.incomes', ['user_id', 'topic_id'], [values.user_id, values.topic_id]);
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports.show_per_account = async function (app) {
    try {
        const res = await query.Select(app, 'vouchers.incomes', ['user_id', 'account_id'], [values.user_id, values.account_id]);
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports.show_per_topic_and_account = async function (app) {
    try {
        const res = await query.Select(app, 'vouchers.incomes', ['user_id', 'topic_id', 'account_id'], [values.user_id, values.topic_id, values.account_id]);
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports.save_new_income = async function (app, values) {
    try {
        const res = await query.Insert(app, 'vouchers.incomes',
            ['title', 'draft', 'income_date', 'user_id', 'topic_id', 'account_id'],
            [values.title, values.draft, values.income_date, values.user_id, values.topic_id, values.account_id]
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
            ['title', 'draft', 'income_date', 'topic_id', 'account_id'],
            [values.title, values.draft, values.income_date, values.topic_id, values.account_id],
            ['id'],
            [values.id]
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
            ['id'],
            [values.id]
        );
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }   
}