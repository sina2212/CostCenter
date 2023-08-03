const express = require('express');
const resolve = require('path').resolve;

module.exports = function(app) 
{
    // Handling Statics
    app.use('/assets/css',       express.static(resolve('./assets/css')))
    app.use('/assets/fs',       express.static(resolve('./assets/fs')))    
    app.use('/assets/js',        express.static(resolve('./assets/js')))
    app.use('/assets/img',       express.static(resolve('./assets/img')))
    app.use('/uploads',       express.static(resolve('./uploads')))
    app.use('/DATA',       express.static(resolve('./DATA')))
    app.use('/assets/bootstrap/css', express.static(resolve('./node_modules/bootstrap/dist/css')))
    app.use('/assets/bootstrap/js', express.static(resolve('./node_modules/bootstrap/dist/js')))
    app.use('/assets/all-icons', express.static(resolve('./node_modules/all-icons/dist')))
    app.use('/assets/datatables/css', express.static(resolve('./node_modules/datatables/media/css')))
    app.use('/assets/datatables/js', express.static(resolve('./node_modules/datatables/media/js')))
    app.use('/assets/datatables/images', express.static(resolve('./node_modules/datatables/media/images')))
    app.use('/assets/datatables-bs4/css', express.static(resolve('./node_modules/datatables.net-bs4/css')))
    app.use('/assets/datatables-bs4/js', express.static(resolve('./node_modules/datatables.net-bs4/js')))
    app.use('/assets/jquery',    express.static(resolve('./node_modules/jquery/dist')))
}
