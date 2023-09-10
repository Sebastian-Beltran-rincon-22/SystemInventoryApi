const {Admin} = require('../models/user/Role')
const User = require('../models/user/user')



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


            const userFound = await User.findOne({ email: config.ADMIN_EMAIL });
            console.log(userFound);

            if (userFound) return;

            
            const admin = await Admin.find({ name: { $in: ["admin"] } });

            const userRegis = await User.create({
                userName: config.ADMIN_USERNAME,
                email: config.ADMIN_EMAIL,
                password: config.ADMIN_PASSWORD,
                admin: admin.map((admins) => admins._id)
            });

            console.log(`New user created: ${userRegis.email}`);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = creatingRole