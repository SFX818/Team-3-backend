const db = require('../models')

const User = db.users

exports.allAccess = (req,res) => {
    res.status(200).send("public content")
}

exports.userBoard = (req,res) => {
    res.status(200).send("User content")
}

exports.adminBoard = (req,res) => {
    res.status(200).send("Admin content")
}

// find user's about me -- not working
// exports.findOne = (req, res) => {
//     const username = req.params.username;
//     User.findOne(username)
//         .then((data)=>{
//             if(!data){
//                 res.status(400)
//                     .send({
//                         message: "Not found product with id" + username
//                     })
//             } else {
//                 res.send(data)
//             }
//         })
// }