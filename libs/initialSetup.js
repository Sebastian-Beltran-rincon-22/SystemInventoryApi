const {Admin} = require('../models/user/role')



const creatingRole = {
    
        createRoles : async () =>{

        try {
            
            const count = await Admin.estimatedDocumentCount()

            if (count > 0) return

            const values = await Promise.all([
                new Admin ({name: 'user'}).save(),
                new Admin ({name: 'admin'}).save()
            ])

            console.log(values)
        } catch (error) {
            console.log(error)        
        }
    }
}

module.exports = creatingRole