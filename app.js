const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const user = require('./routers/user/user')
const admin = require('./routers/user/auth')
const creatingRole = require ('./libs/initialSetup')


const app = express()
creatingRole.createRoles()

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



module.exports = app