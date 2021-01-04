module.exports = (req, res, next) => {
    if(!req.user){
        req.send("you must be logged in to access that page.")
        res.redirect('/login')
    }
}