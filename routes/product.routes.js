module.exports = app => {
    const products = require('../controllers/product.controller.js')
    let router = require('express').Router();


    //create a new product
    router.post('/', products.create)
    //gets all the products in database
    router.get('/', products.findAll)


    app.use('/api/products', router)
    console.log('route reached 🏄🏾‍♂️')
}

// app.get



// app.put



// app.delete//method override
