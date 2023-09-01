const { resolve } = require('path')
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');
const parseCookies = require(resolve('./libs/parseCookies'))
const personSchema = require(resolve('./db/schema/person'))

module.exports = function (app) {
    app.get('/persons', async (req, res) => {
        try {
            const persons = await personSchema.show_all(app);
            return res.json({status: 'ok', persons: persons,});
        } catch (err) { 
            console.log(err)
        }
    });
    app.post('/persons', async (req, res) => {
        try{
            const first_name = 'sina';
            const last_name = 'ahmadian';
            if(!first_name) {
                return res.json({status: 'error', error_code: 901, message: 'فیلد های مورد نظر را کامل کنید!'});
            }

            person_values = {
                first_name: first_name,
                last_name: last_name
            }
            const savenewPerson = await personSchema.save_new_person(app, person_values)
            if (savenewPerson.length>0) {
                return res.json({status: 'ok', message: 'شخص حقوقی با موفقیت ثبت شد', id: savenewPerson[0].id})
            }
            return res.json({status: 'error', error_code: 901, message: 'خطا'})

        } catch(err) {
            console.log(err)
            return res.json({status: 'error', error_code: 901, message: 'خطایی رخ داده!'})
        }
    });
}