const mongoose = require("mongoose")

const User = mongoose.model(
    "User",
    new mongoose.Schema({
       username: String,
       email: String,
       password: String,
       about: { type: String, default: "default about field"},
       roles: [
           {
               type: mongoose.Schema.Types.ObjectId,
               ref: "Role"
           }
       ] 
    })
)

module.exports = User