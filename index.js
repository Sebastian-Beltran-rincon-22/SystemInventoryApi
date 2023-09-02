const app = require('./app')
const dataBase = require('./database')
const mongoose = require('mongoose')
require(`dotenv`).config()


const port = 3000 // conectec in port
app.listen(port)
console.log('server listen on port', port)

