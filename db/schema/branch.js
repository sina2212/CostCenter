const resolve = require('path').resolve;
const query = require(resolve('./db/query'))

module.exports.show_all = async function (app) {
    try {
        const res = await query.Select(app, 'childs."Bank_Branches"');
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports.save_new_branch = async function (app, values) {
    try {
        const res = await query.Insert(app, 'childs."Bank_Branches"',
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
        const res = await query.Update(app, 'childs."Bank_Branches"',
            ['branch_code', 'bank_id', 'name'],
            [values.branch_code, values.bank_id, values.name],
            ['id', 'user_id'],
            [values.id, values.user_id]
        );
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }   
}

module.exports.delete_branch = async function (app, values) {
    try {
        const res = await query.Delete(app, 'childs."Bank_Branches"',
            ['id', 'user_id'],
            [values.id, values.user_id]
        );
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }   
}