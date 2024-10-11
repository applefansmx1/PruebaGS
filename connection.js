const mongoose = require('mongoose')

const uri = process.env.URI_DB

mongoose.connect(uri)

mongoose.connection.on('open', _ =>{
    console.log('Database is conected on', uri)
})

mongoose.connection.on('error', err => {
    console.log(err)
})
