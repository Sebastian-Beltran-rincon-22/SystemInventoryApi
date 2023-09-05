const express = require ('express')
const router = express.Router()
const userController = require('../../controllers/user/user')
const authJwt = require('../../middlewares/authJwt')

router.post('/create',[authJwt.verifyToken,authJwt.isAdmin],userController.create)
router.get('/',userController.getAdmin)


module.exports = router