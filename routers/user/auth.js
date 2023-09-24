const express = require ('express')
const router = express.Router()
const adminController = require('../../controllers/user/auth')
const verifySignup = require ('../../middlewares/verifySignup');
const authJwt = require('../../middlewares/authJwt')

router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
    });

router.post('/signup',[authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkRoleExist, verifySignup.checkDupletUser],adminController.signup)
router.post('/signin',[verifySignup.checkRoleExist],adminController.signin)





module.exports = router
