const User = require ('../../models/user/user')
const {Admin} = require('../../models/user/role')
const Config = require('../../config')
const jwt = require('jsonwebtoken')

const userController = {
    
    register: async (req, res) => {
        try {
            const {nickName,email,password} = req.body
            const adminFound = await Admin.findOne({name: 'user'})

            const user = new User({
                nickName,
                email,
                password,
                lastConnect: new Date(),
                roles: [adminFound._id]
            })

            user.password = await User.encryptPassword(user.password)

            const savedUser = await user.save()

            const token = jwt.sign({id: savedUser._id}, Config.SECRET,{
                expiresIn: 86400
            })

            return res.status(200).json({
                token,
                savedUser:{
                _id: savedUser._id,
                userName: savedUser.userName,
                email: savedUser.email,
                password: savedUser.password,
                roles: savedUser.roles,
                }
            })

        } catch (error) {
            return res.status(500).json(error.message)
        }
    },

    getUsersByRole: async (req, res) => {
        try {
            const adminFound = await Admin.findOne({ name: 'user' });
    
            const users = await User.find({ roles: adminFound._id });
    
            res.json(users.reverse());
        } catch (error) {
            return res.status(500).json({ msg: error });
        }
    },
    

}

module.exports = userController
