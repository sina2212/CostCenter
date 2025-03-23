const resolve = require('path').resolve;
const query = require(resolve('./db/query'))

module.exports.show_all = async function (app, values) {
    try {
        const res = await query.Select(app, 'basics.branches', ['user_id'], [values.user_id]);
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports.show_per_bank = async function (app, values) {
    try {
        const res = await query.Select(app, 'basics.branches', ['user_id', 'bank_id'], [values.user_id, values.bank_id]);
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports.save_new_branch = async function (app, values) {
    try {
        const res = await query.Insert(app, 'basics."branches"',
            ['branch_code', 'bank_id', 'name', 'user_id'],
            [values.branch_code, values.bank_id, values.name, values.user_id]
        );
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }   
}

module.exports.edit_branch = async function (app, values) {
    try {
        const res = await query.Update(app, 'basics."branches"',
            ['branch_code', 'bank_id', 'name'],
            [values.branch_code, values.bank_id, values.name],
            ['id'], [values.id]
        );
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }   
}

module.exports.delete_branch = async function (app, values) {
    try {
        const res = await query.Delete(app, 'basics."branches"',
            ['id'],
            [values.id,]
        );
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }   
}