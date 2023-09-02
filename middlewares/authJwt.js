const jwt = require('jsonwebtoken')
const Config = require('../config')
const Admin = require('../models/user/admin')
const SuperAdmin = require('../models/user/superAdmin')

const authJwt = {
    
    verifyToken : async(req,res,next) =>{

        let token = req.headers['x-access-token']

        if(!token) return res.status(403).json({message: 'no token'})

        try{
            const decoded = jwt.verify(token,Config.SECRET)
            req.adminId = decoded.id 

            const admin = await Admin.findById(req.adminId,{password: 0})
            if (!admin) return res.status(404).json({message: 'no admin found'})
            
            next()
        }catch (error){
            res.status(401).json({message: 'Unauthorized'})
        }
    },

    isSuperAdmin : async (req,res,next) =>{
        try{

            const admin = await Admin.findById(req.adminId)
            const superAdmin = await SuperAdmin.find({_id:{$in: admin.superAdmin}})

            for (let i = 0; i < superAdmin.length; i++){
                if(superAdmin[i].name === 'superadmin'){
                    next()
                    return
                }
            }

            return res.status(403).json({message: 'Require superAdmin role'})
        }catch(error){
            console.log(error);
            return res.status(500).send({ message: error });
        }
    }
}

module.exports = authJwt