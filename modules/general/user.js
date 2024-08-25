const { resolve } = require('path')
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');
const crypto = require('crypto')
const bcrypt = require('bcrypt')

const parseCookies = require(resolve('./libs/parseCookies'))
const userSchema = require(resolve('./db/schema/general/user'))

module.exports = function (app) {
    app.get('/users', async (req, res) => {
        try {
            const persons = await userSchema.show_all(app);
            return res.json({status: 'ok', persons: persons,});
        } catch (err) { 
            console.log(err)
        }
    });
    app.post('/users', async (req, res) => {
        try{
            const userName = req.body.username;
            const passwordText = req.body.password;
            const personId = req.body.person_id;
            if(!userName || !passwordText) {
                return res.json({status: 'error', error_code: 901, message: 'فیلد های مورد نظر را کامل کنید!'});
            }
            const password = await bcrypt.hash(passwordText, app.CC.Config.Security.HASH_DIFFICULTY);
            
            const userValues = {
                username: userName,
                password: password,
                person_id: personId,
            }
            // const exist_user = await userSchema.check_unique(app, userName, personId);
            // if (exist_user.length > 0) {
            //     return res.json({status: 'ok', message: 'کاربر وجود دارد'});
            // }
            const new_user = await userSchema.save_new_user(app, userValues);
            if (new_user.length == 0 || new_user == false) {
                return res.json({status: 'error', message: 'خطایی در هنگام ثبت کاربر رخ داده', id: -1});
            }
            
        } catch(err) {
            if (err.code === '23505') {
                return res.json({status: 'error', message: 'این شخص بعنوان کاربر ثبت شده', id: -1});
            }
            else {
                console.log(err);
                return res.json({status: 'error', error_code: err["code"], message: ""});
            }
        }
    });
}