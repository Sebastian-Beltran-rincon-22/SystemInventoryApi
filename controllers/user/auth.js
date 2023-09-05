const Config = require('../../config')
const jwt = require('jsonwebtoken')
const User = require('../../models/user/user')
const {Admin} = require('../../models/user/role')


const adminController ={

    signup: async (req,res) =>{
        try{
        const {nickName, email, password, roles} = req.body

        const userRegis = new User({
            nickName,
            email,
            password,
            lastConnect: new Date()
        })

        if(roles){
            const foundAdmin = await Admin.find({name: {$in: roles} })

            userRegis.roles = foundAdmin.map((role) => role._id)
        } else{
            const role = await Admin.findOne({name: 'user'}) 

            if (role) {
                console.log(role._id);
                userRegis.admin = [role._id];
            } else {
                console.log("No 'user' admin found.");
            }
        }
        const savedUser= await userRegis.save()

        const token = jwt.sign({id: savedUser._id}, Config.SECRET,{
            expiresIn: 86400 
        })
        res.status(200).json({token, savedUser: { _id: savedUser._id, nickName, email, password}})
    }catch(error){
        return res.status(500).json(error.message)
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


module.exports = adminController