const db = require('../models')

const Product = db.products

exports.create = (req, res) => {
    //validate request
    if(!req.body.name){
        res.status(400).send({message: 'Name can not be empty!'})
        return;
    }
    //create a product
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        //image: not sure how we're going to this yet
        description: req.body.description
    })
    //save product in the database
    product
    //save the data
        .save(product)
        //send the data to see what we created
        .then((data) =>{
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: 
                    err.message || 'Some error occured while create a new product'
            });
        });
};

exports.findAll = (req, res) => {
    
    Product.find()
    .then((data) => {
        res.send(data)
    })
    .catch((err) => {
        res.status(500).send({
            message:
            err.message || "Some error occured while finding all the products"
        })
    })
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    Product.findOne(id)
        .then((data)=>{
            if(!data){
                res.status(400)
                    .send({
                        message: "Not found product with id" + id
                    })
            } else {
                res.send(data)
            }
        })


}