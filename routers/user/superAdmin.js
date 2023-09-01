const express = require ('express')
const router = express.Router()
const superAdmincontroller = require ('../../controllers/user/superAdmin')

router.get('/', superAdmincontroller.getAdmins)
router.get('/:id', superAdmincontroller.getById)
router.post('/:id', superAdmincontroller.createById)
router.patch('/:id', superAdmincontroller.updateById)
router.delete('/:id', superAdmincontroller.deleteById)



