const mongoose = require('mongoose')
const Schema = mongoose.Schema

const supAdminSchema = new Schema({

    name:{
        type: String
    },
    roles:{
        type:String,
        enum: ['admin', 'superadmin'],
        default: 'admin'
    }
},{versionKey:false})

module.exports = mongoose.model('SuperAdmin',supAdminSchema)