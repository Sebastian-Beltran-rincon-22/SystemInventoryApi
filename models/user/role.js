const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ROLE = ["admin","user"]

const roleSchema = new Schema({

    name:String

},{versionKey:false})

const Admin = mongoose.model('Admin',roleSchema)

module.exports = {

    Admin:Admin,

    ROLE:ROLE
}