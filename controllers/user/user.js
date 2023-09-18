const User = require ('../../models/user/user')
const {Admin} = require('../../models/user/role')
const Config = require('../../config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

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

            const savedUser = await user.save()
            await savedUser.populate('roles')

            const token = jwt.sign({id: savedUser._id}, Config.SECRET,{
                expiresIn: 86400
            })

            return res.status(200).json({ token, savedUser})

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
    
    updateUser: async (req,res) =>{

        try {
            const {id} = req.params
            const {nickName, email} = req.body

            const dataUpdate = await User.findByIdAndUpdate(id,{
                nickName: nickName,
                email: email
            }) 
            res.status(201).json(dataUpdate)
            
        } catch (error) {
            return res.status(500).json({ msg: error.message});
        }
    },
    changePassword: async (req, res) => {
        try {
            const { userId } = req.params;
            const { newPassword } = req.body;
    
            // Encripta la nueva contraseña
            const saltRounds = 10; // Número de rondas de sal para la encriptación (ajusta según tus necesidades)
            const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
    
            // Actualiza la contraseña del usuario en la base de datos
            const updatedUser = await User.findByIdAndUpdate(userId, { password: hashedNewPassword });
    
            res.status(200).json({ message: 'Contraseña actualizada con éxito', updatedUser });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }

}

module.exports = userController
