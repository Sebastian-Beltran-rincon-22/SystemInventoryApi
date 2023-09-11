const {ROLE} = require ('../models/user/role');
const User = require('../models/user/user');

const verifySignup = {

    checkDupletUser : async(req,res,next) =>{
        try {

            const userFound = await User.findOne({nickName: req.body.nickName})
            if(userFound) return res.status(400).json({message: 'The User already exists'})

            const email = await User.findOne({email: req.body.email})
            if(email) return res.status(400).json({message: 'The Email already exists'})

            next()
            
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },

    checkRoleExist: (req, res, next) => {

        if (!req.body.roles || req.body.roles.length === 0) {
            req.body.roles = ["user"]
        }
        
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLE.includes(req.body.roles[i])) {
                return res.status(400).json({
                    message: `Role ${req.body.roles[i]} does not exist`});
            }
        }
        
        next();
    }
}


module.exports = verifySignup;
