const express = require ('express')
const router = express.Router()
const adminController = require('../../controllers/user/admin')
const authJwt = require('../../middlewares/authJwt')

router.post('/create',[authJwt.verifyToken,authJwt.isSuperAdmin],adminController.create)
router.get('/',adminController.getAdmin)


module.exports = router