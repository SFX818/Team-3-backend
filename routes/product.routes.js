module.exports = app => {
    const products = require('../controllers/product.controller.js')
    //let router = require('express').Router(); //*****Don't need a router here, we are getting passed app from server.js


    //create a new product
    //router.post('/', products.create)
    //gets all the products in database
    app.get('/api/products', products.findAll)
    app.post('/api/products', products.create)
    app.delete('/api/products/:id', products.delete)
    app.put('/api/products/:id', products.update)
   // app.use('/api/products', router)
}

// app.delete//method override