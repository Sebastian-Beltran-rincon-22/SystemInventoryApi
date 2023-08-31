const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const admin = require('./routers/user/admin')
const superAdmin = require('./routers/user/superAdmin')


const app = express()
createAdmin()

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


app.use('/api/admins',admin)
app.use('/api/superAdmin',superAdmin)



module.exports = app