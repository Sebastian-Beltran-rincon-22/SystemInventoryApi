const User = require ('../../models/user/user')
const {Admin} = require('../../models/user/role')

const userController = {
    
    create: async (req, res) => {
        try {
            const {nickName,email,password,roles} = req.body
            const adminFound = await Admin.find({ name: { $in: roles } })

            const user = new User({
                nickName,
                email,
                password,
                lastConnect: new Date(),
                roles: adminFound.map((role) => role._id)
            })

            user.password = await User.encryptPassword(user.password)

            const savedUser = await user.save()

            return res.status(200).json({
                _id: savedUser._id,
                userName: savedUser.userName,
                email: savedUser.email,
                password: savedUser.password
            })

        } catch (error) {
            return res.status(500).json({ msg: error })
        }
    },

    getAdmin: async (req, res) => {
        try {
            const users = await User.find({})
            res.json(users.reverse())
        } catch (error) {
            return res.status(500).json({ msg: error })
        }
    },

}

module.exports = userController
