const resolve = require('path').resolve;
//const lengthObject = require(resolve('./libs/lengthObject'));
// GENERAL QUERY
async function Query(app, query, value=undefined)
{
    try {
        if (!value)
            return await app.CC.Config.PostgreSQL.Client.query(query)
        else
            return await app.CC.Config.PostgreSQL.Client.query(query, value)
    } catch (err) {
        console.log(err)
    }
    return undefined
}
// SELECT QUERY
async function Select(app, table_name, filter_field=undefined, filter_value=undefined, filter_condition='AND', sort_field=undefined, sort_asc=true) {
    if (!filter_field || !filter_value) {
        if (!sort_field)
            return await Query(app, `SELECT * FROM ${table_name};`)
        else
            return await Query(app, `SELECT * FROM ${table_name} ORDER BY ${sort_field} ${sort_asc ? 'ASC' : 'DESC'};`)
    } else {
        var params = '';
        for (var i = 1; i <= filter_field.length; i++) {
            if (params.length)
                params += ` ${filter_condition} `
            params += `${filter_field[i - 1]} = $${i}`
        }
        if (!sort_field)
            return await Query(app, `SELECT * FROM ${table_name} WHERE (${params});`, filter_value)
        else
            return await Query(app, `SELECT * FROM ${table_name} WHERE (${params}) ORDER BY ${sort_field} ${sort_asc ? 'ASC' : 'DESC'};`, filter_value)
    }
}
//TODO: create select query return a specefic value
// INSERT QUERY
async function Insert(app, table_name, fields, values) {
    var params = '';
    for (var i = 1; i <= fields.length; i++) {
        if (params.length)
            params += ` , `
        params += `$${i}`
    }
    return await Query(app, `INSERT INTO ${table_name}(${fields}) VALUES (${params}) RETURNING *;`, values)
}
// DELETE QUERY
async function Delete(app, table_name, filter_fields, filter_values, filter_condition='AND') {
    if (!filter_fields || !filter_values)
        return undefined
    var params = '';
    for (var i = 1; i <= filter_fields.length; i++) {
        if (params.length)
            params += ` ${filter_condition} `
        params += `${filter_fields[i - 1]} = $${i}`
    }
    return await Query(app, `DELETE FROM ${table_name} WHERE (${params}) RETURNING *;`, filter_values)
}
// UPDATE QUERY
async function Update(app, table_name, update_fields, update_values, filter_fields, filter_values, filter_condition='AND') {
    if (!filter_fields || !filter_values || !update_fields || !update_values)
        return undefined
    
    var update_params = '';
    var filter_params = '';
    var i = 1;
    
    for (i = 1; i <= update_fields.length; i++) {
        if (update_params.length)
        update_params += ` , `
        update_params += `${update_fields[i - 1]} = $${i}`
    }

    for (var j = i; j < filter_fields.length + i; j++) {
        if (filter_params.length)
        filter_params += ` ${filter_condition}  `
        filter_params += `${filter_fields[j - i]} = $${j}`
    }
    return await Query(app, `UPDATE ${table_name} SET ${update_params} WHERE (${filter_params}) RETURNING *;`, update_values.concat(filter_values))
}
module.exports = {Query, Select, Insert, Delete, Update}
