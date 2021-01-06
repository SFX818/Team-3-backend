module.exports = app => {
    const products = require('../controllers/product.controller.js')
    //let router = require('express').Router(); //*****Don't need a router here, we are getting passed app from server.js
    let multer = require('multer')
    const DIR = 'uploads';
    

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, DIR);
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file)
        }
    });

    let upload = multer({storage: storage}).single('file')

    
    
    app.get('/api/products', products.findAll)
    app.post('/api/products', (req,res)=>{
        
        upload(req,res, function(err) {
            if (err instanceof multer.MulterError){
                return res.status(500).json(err)
            } else if (err) {
                return res.status(500).json(err)
            }
            products.create(req,res)
        })
    })
    app.delete('/api/products/:id', products.delete)
    app.put('/api/products/:id', products.update)
   // app.use('/api/products', router)
}

// app.delete//method override