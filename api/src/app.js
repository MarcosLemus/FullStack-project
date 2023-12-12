if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const config = require('config')

const express = require('express')

const app = express()

require('./startup/config')()
require('./startup/db')()
require('./startup/routes')(app)

const port = process.env.PORT || config.get('port')

app.listen(port, () => {
	console.log(`${config.get('env')}: Example app listening on port ${port}`)
})
