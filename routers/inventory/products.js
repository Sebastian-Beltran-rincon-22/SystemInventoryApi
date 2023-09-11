const express = require('express')
const router = express.Router()
const productsController = require('../../controllers/inventory/products')
const authJwt = require('../../middlewares/authJwt')


router.post('/', [authJwt.verifyToken], productsController.createProducts)
router.get('/', [authJwt.verifyToken], productsController.getProducts)
router.get('/:id', [authJwt.verifyToken], productsController.getProductsById)
router.patch('/:id', [authJwt.verifyToken], productsController.updateProductsById)
router.delete('/:id', [authJwt.verifyToken], productsController.deleteProductsById)

module.exports = router