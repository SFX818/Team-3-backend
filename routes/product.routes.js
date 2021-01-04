module.exports = app => {
    const products = require('../controllers/product.controller.js')
    //let router = require('express').Router(); //*****Don't need a router here, we are getting passed app from server.js
    let multer = require('multer')
    const DIR = './uploads/';
    let upload = multer({dest: './uploads/'}).single('image')

    // const storage = multer.diskStorage({
    //     destination: (req, file, cb) => {
    //         cb(null, DIR);
    //     },
    //     filename: (req, file, cb) => {
    //         const fileName = file.originalname.toLowerCase().split(' ').join('-');
    //         cb(null, uuidv4() + '-' + fileName)
    //     }
    // });

    // let upload = multer({
    //     storage: storage,
    //     fileFilter: (req, file, cb) => {
    //         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
    //             cb(null, true);
    //         } else {
    //             cb(null, false);
    //             return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    //         }
    //     }
    // });

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