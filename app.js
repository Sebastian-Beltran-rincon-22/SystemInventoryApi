const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const creatingRole = require ('./libs/initialSetup')
//Routing 
const user = require('./routers/user/user')
const admin = require('./routers/user/auth')
const category = require('./routers/inventory/category')
const product = require('./routers/inventory/products')

const app = express()
creatingRole.createRoles()
creatingRole.adminprint()

app.use(cors({
    origin:"*",
    methods:"GET,HEAD,POST,PATCH,PUT,DELETE",
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
}))

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


app.use('/api/superAdmin',admin)
app.use('/api/users', user)
app.use('/api/category', category)
app.use('/api/products', product)


module.exports = app