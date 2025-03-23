const { resolve } = require('path')
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');
const crypto = require('crypto')
const bcrypt = require('bcrypt');
const { log } = require('console');

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
            const exist_user = await userSchema.check_unique(app, userValues);
            if (exist_user.length > 0) {
                return res.json({status: 'ok', message: 'کاربر وجود دارد'});
            }
            const new_user = await userSchema.save_new_user(app, userValues);
            if (new_user.length == 0 || new_user == false) {
                return res.json({status: 'error', message: 'خطایی در هنگام ثبت کاربر رخ داده', id: -1});
            }
            
        } catch(err) {
            if (err["code"] === '23505') {
                return res.json({status: 'error', message: 'این شخص بعنوان کاربر ثبت شده', id: -1});
            }
            else {
                console.log(err);
                return res.json({status: 'error', error_code: err["code"], message: ""});
            }
        }
    });
    app.patch('/users', async(req, res)=>{
        try {
            const userId = req.body.id;
            const email = req.body.email;
            const userName = req.body.username;
            const phoneNumber = req.body.phone_number;
            if (!email || !phoneNumber || !userId || !userName) {
                return res.json({status: 'error', error_code: 901, message: 'فیلد های مورد نظر را کامل کنید!'});
            }
            const infoValues ={
                id: userId,
                email: email,
                username: userName,
                phone_number: phoneNumber,
            }
            const change = await userSchema.change_information(app, infoValues);
            if (change.length == 0 || change == false) {
                return res.json({status: 'error', message: 'خطایی در هنگام ثبت کاربر رخ داده', id: -1});
            }
            else{
                return res.json({status: 'OK', message:'ویرایش با نموفقیت انجام شد'});
            }
        } catch (error) {
            console.log(err);
            return res.json({status: 'error', error_code: err["code"], message: ""});
        }
    });
    app.put('/users', async(req, res)=>{
        try {
            const passwordText = req.body.password;
            const userId = req.body.id;
            if (!passwordText || !userId) {
                return res.json({status: 'error', error_code: 901, message: 'فیلد های مورد نظر را کامل کنید!'});
            }
            const password = await bcrypt.hash(passwordText, app.CC.Config.Security.HASH_DIFFICULTY);
            const infoValues ={
                id: userId,
                password: password,
            }
            const change_password = await userSchema.change_password(app, infoValues);
            if (change_password.length == 0) {
                return res.json({status: 'error', message: 'خطایی در هنگام ثبت کاربر رخ داده', id: -1});
            }
            else{
                return res.json({status: 'OK', message:'ویرایش با نموفقیت انجام شد'});
            }
        } catch (error) {
            console.log(err);
            return res.json({status: 'error', error_code: err["code"], message: ""});
        }
    });
}