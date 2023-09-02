const Admin = require('../../models/user/admin')
const SuperAdmin = require('../../models/user/superAdmin')

const adminController = {
    
    create: async (req,res, next) =>{
        try {
            
            if (req.admin.roles !== 'superadmin'){
                return res.status(403).json({message: 'No permissions'})
            }

            const {nickName, emailUs, password} = req.body
            
            const admins = new Admin({

                nickName,
                emailUs,
                password,
                lastConnect: new Date(),
                roles: 'admin'
            })
            admins.password = await Admin.encryptPassword(admins.password)


            const savedAdmin= await admins.save()
            res.status(200).json({savedAdmin})


        } catch (error) {
            next(error)
        }
    },
    getAdmin: async (req, res) => {
        try {
            const admins = await Admin.find({})
            res.json(admins.reverse())
        } catch (error) {
            return res.status(500).json({ msg: error })
        }
    },

}

module.exports = adminController