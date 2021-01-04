const db = require('../models')

const Product = db.products
const cloudinary = require('cloudinary')

exports.create = (req, res) => {
    //validate request
    if(!req.body.name){
        res.status(400).send({message: 'Name can not be empty!'})
        return;
    }
    //cloudinary post here
    let imgURL = ""
    console.log(req.body.image)
    cloudinary.uploader.upload(req.file.path, function(result){
        imgURL = result.url
    })
   
    //create a product
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        image: imgURL,
        description: req.body.description,
        userSelling: req.body.username
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

exports.delete = (req, res) => {
    const id = req.params.id;
    Product.findByIdAndDelete (id)
    .then((data)=>{
        if(!data){
            res.status(505)
            .send({message:"it was deleted" + id})
        } else {
            res.send(data)
        }
    })
}

exports.update = (req,res) => {
    const id = req.params.id;
    Product.findByIdAndUpdate({_id :id}, req.body).then((data)=>{
        if(!data){
            res.status(400).send({message: "Not found Product with id" + id});
        }else{
            res.send(data)
        }
    })
}