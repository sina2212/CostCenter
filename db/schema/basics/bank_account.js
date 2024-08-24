const resolve = require('path').resolve;
const query = require(resolve('./db/query'))

module.exports.show_all = async function (app, values) {
    try {
        const res = await query.Select(app, 'basics.bank_accounts', ['user_id, branch_id'], [values.user_id, values.branch_id]);
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports.save_new_account = async function (app, values) {
    try {
        const res = await query.Insert(app, 'basics.bank_accounts',
            ['branch_id', 'account_number', 'account_type', 'card_account_number', 'shaba_number', 'user_id'],
            [values.branch_id, values.account_number, values.account_type, values.card_account_number,values.shaba_number, values.user_id]
        );
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }   
}

module.exports.edit_account = async function (app, values) {
    try {
        const res = await query.Update(app, 'basics.accounts',
            ['account_number', 'account_type', 'card_account_number', 'shaba_number'],
            [values.branch_id, values.account_number, values.account_type, values.card_account_number,values.shaba_number],
            ['id', 'branch_id'], [values.id, values.branch_id]
        );
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }   
}

module.exports.delete_account = async function (app, values) {
    try {
        const res = await query.Delete(app, 'basics.accounts',
            ['id'],
            [values.id]
        );
        return res.rows;
    } catch (error) {
        console.log(error);
        return false;
    }   
}