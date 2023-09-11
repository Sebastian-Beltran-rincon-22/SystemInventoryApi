const express = require('express')
const router = express.Router()
const categoryController = require('../../controllers/inventory/category')
const authJwt = require('../../middlewares/authJwt')

router.post('/', [authJwt.verifyToken, authJwt.isAdmin], categoryController.createCategory)
router.get('/', categoryController.getCategory)
router.get('/:id', categoryController.getCategoryForId)


module.exports = router