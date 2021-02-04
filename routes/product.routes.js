module.exports = app => {
    app.use( (req,res, next) => {
        // set header and allow use of x access token ( we will use this to pass our token )
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-type, Accept, x-requested-with"
        );
        next();
    })

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