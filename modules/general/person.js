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
            if(!first_name || !last_name) {
                return res.json({status: 'error', error_code: 901, message: 'فیلد های مورد نظر را کامل کنید!'});
            }
            person_values = {
                first_name: first_name,
                last_name: last_name
            }
            const savenewPerson = await personSchema.save_new_person(app, person_values);
            if (savenewPerson.length>0) {
                return res.json({status: 'ok', message: 'شخص موفقیت ثبت شد', id: savenewPerson[0].id});
            }
            return res.json({status: 'error', error_code: 901, message: 'خطا'})
            
        } catch(err) {
            console.log(err)
            return res.json({status: 'error', error_code: 901, message: 'خطایی رخ داده!'})
        }
    });    
    app.put('/persons', async (req, res) => {
        try {
            const first_name = req.body.first_name;
            const last_name = req.body.last_name;
            const user_name = req.body.user_name;
            if (!first_name || !last_name) {
                return res.json({status: 'error', error_code: 901, message: 'فیلد های مورد نظر را کامل کنید!'});
            }
            person_values = {
                first_name: first_name,
                last_name: last_name,
                user_name: user_name
            }
            console.log(person_values);
            
            const change_info = await personSchema.update_person(app, person_values);
            if (change_info.length == 0) {
                return res.json({status: 'error', message: 'خطایی در هنگام ثبت کاربر رخ داده', id: -1});
            }
            else{
                return res.json({status: 'OK', message:'ویرایش با نموفقیت انجام شد'});
            }
        } catch (error) {
            console.log(error)
            return res.json({status: 'error', error_code: 901, message: 'خطایی رخ داده!'})
        }
    });
}