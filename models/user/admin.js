const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema ({

    nickName:{
        type: String,
        required: true,
        unique: true,
        maxLenth: 100
    },
    emailUs:{
        type: String,
        unique: true,
        validate: {
            validator: function(emailUs) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(emailUs);
            },
            message: props => `${props.value} is not a valid email`
        },
        required: [true, 'user email required']
    },
    password:{
        type: String,
        required: true
    },
    lastConnect:{
        type: Date,
        default: null
    }
    
},{versionKey:false}) // SUPER ADMIN QUE ESTE BIEN ROTO => post para crear admins chiquitos

module.exports = mongoose.model('User',adminSchema)

