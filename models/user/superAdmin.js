const mongoose = require('mongoose')
const Schema = mongoose.Schema

const supAdminSchema = new Schema({

    name:{
        type: String
    }
},{versionKey:true})

module.exports = mongoose.model('SuperAdmin',supAdminSchema)