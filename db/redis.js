/* Single value data structure */
module.exports.SET = async function (app, key, value) {
    try {
        await app.CC.Config.Redis.Client.set(key, value)
        return true
    } catch (error) { 
        console.log(error);
        return undefined; 
    }
}
module.exports.GET = async function (app, key) {
    try {
        return await app.CC.Config.Redis.Client.get(key)
    } catch (error) { 
        console.log(error);
        return undefined; 
    }
}
module.exports.MGET = async function (app, keys) {
    try {
        return await app.CC.Config.Redis.Client.MGET(keys)
    } catch (error) { 
        console.log(error);
        return undefined; 
    }
}
module.exports.DEL = async function (app, key) {
    try {
        await app.CC.Config.Redis.Client.del(key)
        return true
    } catch (error) { 
        console.log(error);
        return undefined; 
    }
}
module.exports.EXISTS = async function (app, key) {
    try {
        return await app.CC.Config.Redis.Client.EXISTS(key)
    } catch (error) { 
        console.log(error);
        return undefined; 
    }
}
module.exports.EXPIRE = async function (app, key, time) {
    try {
        await app.CC.Config.Redis.Client.EXPIRE(key, time)
        return true
    } catch (error) { 
        console.log(error);
        return undefined; 
    }
}
module.exports.KEYS = async function (app, key, pattern) {
    try {
        return await app.CC.Config.Redis.Client.KEYS(key, pattern)
    } catch (error) { 
        console.log(error);
        return undefined; 
    }
}
/* Hash table data structure */
module.exports.HASH_SET = async function (app, key, field, value) {
    try {
        await app.CC.Config.Redis.Client.HSET(key, field, value)
        return true
    } catch (error) {
        console.log(error);
        return undefined; 
    }
}
module.exports.HASH_GET = async function (app, key, field) {
    try {
        return await app.CC.Config.Redis.Client.HGET(key, field)
    } catch (error) { 
        console.log(error);
        return undefined; 
    }
}
module.exports.HASH_GET_ALL = async function (app, key) {
    try {
        return await app.CC.Config.Redis.Client.HGETALL(key)
    } catch (error) { 
        console.log(error);
        return undefined; 
    }
}
module.exports.HASH_DEL = async function (app, key, field) {
    try {
        await app.CC.Config.Redis.Client.HDEL(key, field)
        return true
    } catch (error) { 
        console.log(error);
        return undefined; 
    }
}
module.exports.HASH_DEL_ALL = async function (app, key) {
    return await module.exports.DEL(app, key)
}
module.exports.HASH_FIELD_KEYS = async function (app, key) {
    try {
        return await app.CC.Config.Redis.Client.HKEYS(key)
    } catch (error) { 
        console.log(error);
        return undefined; 
    }
}
module.exports.HASH_FIELD_EXISTS = async function (app, key, field) {
    try {
        return await app.CC.Config.Redis.Client.HEXISTS(key, field)
    } catch (error) { 
        console.log(error);
        return undefined; 
    }
}
