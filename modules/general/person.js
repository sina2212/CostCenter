const { resolve } = require('path')
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');
const crypto = require('crypto')
const bcrypt = require('bcrypt')

const parseCookies = require(resolve('./libs/parseCookies'))
const personSchema = require(resolve('./db/schema/general/person'))
// const userSchema = require(resolve('./db/schema/general/user'))

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
            const first_name = req.body.first_name;
            const last_name = req.body.last_name;
            // const username = req.body.username;
            // const password_text = req.body.password;
            if(!first_name || !last_name) {
                return res.json({status: 'error', error_code: 901, message: 'فیلد های مورد نظر را کامل کنید!'});
            }
            const password = await bcrypt.hash(password_text, app.CC.Config.Security.HASH_DIFFICULTY);
            
            person_values = {
                first_name: first_name,
                last_name: last_name
            }
            // const exist_user = await userSchema.check_unique(app, username);
            // if (exist_user.length > 0) {
            //     return res.json({status: 'ok', message: 'کاربر وجود دارد'});
            // }
                const savenewPerson = await personSchema.save_new_person(app, person_values);
                if (savenewPerson.length>0) {
                    // user_values = {
                    //     username: username,
                    //     password: password,
                    //     person_id: savenewPerson[0].id
                    // }
                    // const new_user = await userSchema.save_new_user(app, user_values);
                    // if (new_user.length == 0) {
                    //     return res.json({status: 'ok', message: 'نمیتوان کاربر ایجاد کرد', id: savenewPerson[0].id});
                    // }
                    return res.json({status: 'ok', message: 'شخص موفقیت ثبت شد', id: savenewPerson[0].id});
                }
                return res.json({status: 'error', error_code: 901, message: 'خطا'})
            
        } catch(err) {
            console.log(err)
            return res.json({status: 'error', error_code: 901, message: 'خطایی رخ داده!'})
        }
    });
}