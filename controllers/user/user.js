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

    login: async (req,res) =>{

        try {
            const userFound = await User.findOne({ email: req.body.email }).populate("roles");
    
            if (!userFound) {
                return res.status(400).json({ message: 'Usuario no encontrado' });
            }
            
            
            if (userFound.password === req.body.password) {
                console.log('inicio sesión exitoso', userFound.nickName);
            } else {
                console.log('contraseña incorrecta');
            }                
    
            userFound.lastConnect = new Date();
            await userFound.save();

            const token = jwt.sign({ id: userFound._id }, Config.SECRET, {
                expiresIn: 86400
            });
    
            res.json({ token, userFound, roles: { _id: userFound._id, role: userFound.roles } });
            
            
        } catch (error) {
            return res.status(404).json(error.message)
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
