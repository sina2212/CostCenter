const { resolve } = require('path')

const bank = require(resolve('./db/schema/general/bank'))

module.exports = function (app) {
    app.get('/banks', async (req, res) => {
        try {
            const banks = await bank.show_all(app);
            return res.json({status: 'ok', banks: banks,});
        } catch (err) { 
            console.log(err)
        }
    });
    app.post('/banks', async (req, res) => {
        try{
            const name = req.body.name;
            if(!name) {
                return res.json({status: 'error', error_code: 901, message: 'فیلد های مورد نظر را کامل کنید!'});
            }
            const bank_value = {
                name: name
            }
            const saved_bank = await bank.save_new_bank(app, bank_value);
            if (saved_bank.length > 0) {
                return res.json({status: 'ok', message: 'بانک ایجاد شد!', id: saved_bank[0].id})
            }
        } catch(err) {
            console.log(err)
            return res.json({status: 'error', error_code: 901, message: 'خطایی رخ داده!'})
        }
    });
}