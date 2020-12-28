const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = {}

db.mongoose = mongoose
db.user = require('./user.model')
db.role = require('./role.model')
// db.url = dbConfig.url;

db.Roles = ['users', 'admin']

db.products = require('./product.model.js')(mongoose)

module.exports = db