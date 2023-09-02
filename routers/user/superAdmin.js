const express = require ('express')
const router = express.Router()
const superAdminCon = require('../../controllers/user/superAdmin')

router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
    });

router.post('/signup',superAdminCon.signup)
router.delete('/:id', superAdminCon.deleteUser)

// router.get('/', superAdmincontroller.getAdmins)
// router.get('/:id', superAdmincontroller.getById)
// router.post('/', superAdmincontroller.createById)
// router.patch('/:id', superAdmincontroller.updateById)
// router.delete('/:id', superAdmincontroller.deleteById)


module.exports = router
