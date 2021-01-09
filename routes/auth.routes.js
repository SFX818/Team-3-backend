const { verifySignup } = require('../middlewares/')
const controller = require('../controllers/auth.controller')

module.exports = function(app) {
    app.use( (req,res, next) => {
        // set header and allow use of x access token ( we will use this to pass our token )
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-type, Accept"
        );
        next();
    })
    // set up signup route and pass middlewares to check username,email and roles
    app.post("/api/auth/signup", 
    [verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRolesExisted],
    controller.signup
    )
    // handle sign in
    app.post("/api/auth/signin", controller.signin)

    // delete user
    app.delete("/api/auth/delete/:username", controller.delete)

    // change user email
    app.put("/api/auth/editEmail/:id", controller.editEmail)

    // edit username
    app.put("/api/auth/editUsername/:id", controller.editUsername)

    // edit password
    app.put("/api/auth/editPassword/:id", controller.editPassword)

    // get profile
    app.get("/api/auth/profile/:id", controller.getProfile)

    // edit about
    app.put("/api/auth/aboutMe/:id", controller.editAbout)
}

