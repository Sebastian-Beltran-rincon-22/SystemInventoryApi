const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const schemaCategory = new Schema ({

    filter:{
        type: String 
    },

    product:{
        type: mongoose.Schema.Types.ObjectId, // Reñacion muchos a uno  
        ref: 'Products'
    },

    availability:{
        type: Boolean // {Validacion True => cantidad > 0} {/ False => cantidad == 0}
    },

},{versionKey:false})

module.exports = mongoose.model ('Category',schemaCategory)
