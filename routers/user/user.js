const express = require ('express')
const router = express.Router()
const userController = require('../../controllers/user/user')
const authJwt = require('../../middlewares/authJwt')
const verifySignup = require('../../middlewares/verifySignup')

router.post('/create',[authJwt.verifyToken,authJwt.isAdmin,
    verifySignup.checkDupletUser, verifySignup.checkRoleExist],userController.register)

router.post('/login',userController.login)

router.patch('/:id', [authJwt.verifyToken, authJwt.isAdmin], userController.updateUser)

router.get('/usersByRole',[authJwt.verifyToken, authJwt.isAdmin],userController.getUsersByRole)


module.exports = router