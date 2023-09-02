const Config = require('../../config')
const jwt = require('jsonwebtoken')
const Admin = require('../../models/user/admin')
const SuperAdmin = require('../../models/user/superAdmin')


const superAdminCon ={
    signup: async(req, res) =>{
        try{
            const {nickName, emailUs, password, roles} = req.body

            const adminRegis = new Admin({
                nickName,
                emailUs,
                password,
                lastConnect: new Date(),
                roles
            })
            
            if(roles){
                const foundRoles = await SuperAdmin.find({name: {$in: roles}})

                adminRegis.roles = foundRoles.map((superAdmins) => superAdmins._id)
            } else{
                const superAdmins = await SuperAdmin.findOne({name: 'admin'})
                adminRegis.roles = [superAdmins._id]
            }
            const savedSuperAdmin= await adminRegis.save()

            const token = jwt.sign({id: savedSuperAdmin._id}, Config.SECRET,{
                expiresIn: 86400
            })
            res.status(200).json({token ,savedSuperAdmin})

        }catch (error) {
            return res.status(500).json(error.message);
            }
    },
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params
            await SuperAdmin.findByIdAndDelete(id)
            res.json({ msg: 'Delete' })
        } catch (error) {
            return res.status(500).json({ msg: error })
        }
    }
    
}

module.exports = superAdminCon