const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productsSchema = new Schema ({

    nameProducts:{
        type: String,
        required: true
    },
    imgProduct:{
        type: String,
        required: true
    },
    brand:{
        type: String
    },
    description:{
        type: String
    },
    price:{
        type: Number,
        required: true
    },
    entryDate:{
        type: Date,
        default: Date.now
    },
    availability:{
        type: Boolean // Hacer Pruebas para ver si es necesario en Product 
    },
    availableQuantity:{
        type: Number
    },

    category:{ // Relacion de uno a mucho => asignar Categoria para traer los productos con esa categoria
        type: mongoose.Schema.Types.String,
        ref: 'Category'
    }

},{versionKey:false})

module.exports = mongoose.model('Products',productsSchema)