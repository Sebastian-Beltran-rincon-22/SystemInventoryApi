const mongoose = require ('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const userSchema = new Schema ({

    nickName:{
        type: String,
        required: true,
        unique: true,
        maxLenth: 100
    },
    email:{
        type: String,
        unique: true,
        validate: {
            validator: function(email) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
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
    },

    roles:[{
        ref: "Admin",
        type: mongoose.Schema.Types.ObjectId,
    },
    ],

    
},{versionKey:false}) 



userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}


module.exports = mongoose.model('User',userSchema)

