const mongoose = require('mongoose')
const Schema = mongoose.Schema

const supplierSchema = new Schema({

    name:{
        type: String
    },
    address:{
        type: String
    },
    phone:{
        type: Number,
        required: true,
        maxLenth: 15,
        minLenth: 5
    },
    email:{
        type: String,
        unique: true,
        validate: {
            validator: function(emailUs) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(emailUs);
            },
            message: props => `${props.value} is not a valid email`
        },
        required: [true, 'user email required']
    }
},{versionKey:false})

module.exports = mongoose.model('Supplier',supplierSchema)