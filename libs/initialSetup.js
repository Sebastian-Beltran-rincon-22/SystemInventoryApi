const {Admin} = require('../models/user/Role')
const User = require('../models/user/user')
const Config = require('../config')



const creatingRole = {
    
        createRoles : async () =>{

        try {
            
            const count = await Admin.estimatedDocumentCount()

            if (count > 0) return

            const values = await Promise.all([
                new Admin ({name: "user"}).save(),
                new Admin ({name: "admin"}).save()
            ])

            console.log(values)
        } catch (error) {
            console.log(error)        
        }
    },
    adminprint: async () => {
        try {


            const userFound = await User.findOne({ email: Config.ADMIN_EMAIL });
            console.log(userFound);

            if (userFound) return;

            
            const admin = await Admin.findOne({name: 'admin'});

            const userRegis = await User.create({
                nickName: Config.ADMIN_USERNAME,
                email: Config.ADMIN_EMAIL,
                password: Config.ADMIN_PASSWORD,
                roles: [admin._id]
            });

            console.log(`New user created: ${userRegis.email}`);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = creatingRole