const {Admin} = require('../models/user/role')
const User = require('../models/user/user')
const Config = require('../config')
const { name } = require('ejs')
const bcrypt = require('bcrypt')

async function hashPassword(password) {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      console.error('Error al encriptar la contraseña:', error);
      throw error;
    }
  }

const creatingRole = {
    
        createRoles : async () =>{

        try {
            
            const count = await Admin.estimatedDocumentCount()

            if (count > 0) return

            const values = await Promise.all([
                new Admin ({name: "user"}).save(),
                new Admin ({name: "admin"}).save()
            ])

            console.log(values);
            console.log(name);
        } catch (error) {
            console.log(error)        
        }
    },


    adminprint: async () => {
        try {


            const userFound = await User.findOne({ email: Config.ADMIN_EMAIL }).populate("roles");
            console.log(userFound);

            if (userFound) return;

            
            const admin = await Admin.findOne({name: 'admin'});

            const hashedAdminPassword = await hashPassword(Config.ADMIN_PASSWORD);

            const userRegis = await User.create({
                nickName: Config.ADMIN_USERNAME,
                email: Config.ADMIN_EMAIL,
                password: hashedAdminPassword,
                roles: [admin._id]
            });

            console.log(`New user created: ${userRegis.email}`);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = creatingRole