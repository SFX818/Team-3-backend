const jwt = require('jsonwebtoken')
const config = require("../config/auth.config")
const db = require('../models/index')
const User = db.user
const Role = db.role

// This function will verify our web token
verifyWebToken = (req, res, next) => {
    //First we declare our token which is passed in our headers
    let token = req.headers['x-access-token']

    // If not token given we respond with an error
    if(!token) {
        return res.status(403).send({message: "No token provided"})
    }

    // We try to verify the token 
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err){
            return res.status(401).send({message: "Unauthorized"})
        }
        // set userid to decoded id.
        req.userId = decoded.id
        next()
    })
}

// Another funtion to verify if admin or not

isAdmin = (req, res, next) => {
    // .exec return the urser we want to have access too ( if im not mistaken .then will not)
    User.find(req.user.id).exec((err, user) => {
        // throwing an erro becuase this user does not exist
        if (err) {
            return res.status(500).send({message: err})
        }
        
        // find users role if the user exiss
        Role.find({
            _id: { $in: user.roles}
        }, (err, roles)=> {
            if (err) {
               return res.status(500).send({message: err})
            }

            // loop through returnes roles and check if theres an admin role
            for (let i = 0; i < roles.length; i++) {
                if(roles[i].name === 'admin'){
                    next()
                    return
                }
            }

            // if no admin role round, send status 403 message
            res.status(403).send({message: "Requires admin Role"})
        })

    })

}

// add those to an object
const authJwt ={
    verifyWebToken,
    isAdmin
}

module.exports = authJwt