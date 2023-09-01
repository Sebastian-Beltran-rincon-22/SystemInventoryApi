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
    },
    superAdmin:{
        ref: 'SuperAdmin',
        type: mongoose.Schema.Types.ObjectId
    },

    
},{versionKey:false}) 

adminSchema.statics.encryptPassword  = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

adminSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

adminSchema.pre("save", async function (next) {
    const admin = this;
    if (!admin.isModified("password")) {
        return next();
    }
    const hash = await bcrypt.hash(admin.password, 10);
    admin.password = hash;
    next();
})

module.exports = mongoose.model('Admin',adminSchema)

