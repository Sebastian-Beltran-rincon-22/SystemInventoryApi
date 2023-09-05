const {ROLE} = require('../models/user/role');

const verifySignup = {
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
