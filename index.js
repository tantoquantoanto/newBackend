const express = require('express')
const mongoose = require('mongoose')
const PORT = 4043





// import di dotenv per leggere le environment variables
require('dotenv').config()

// istanziamo express per poterne utilizzare i metodi
const server = express()


// import delle routes
const booksRoute = require('./models/routes/books')

// middleware
server.use(express.json())


// utilizzo delle route
server.use('/', booksRoute)





// connessione al database attraverso mongoose
mongoose.connect(process.env.MONGODB_URL)
const db = mongoose.connection

// ascoltiamo l'evento 'error' per farci loggare un messaggio in caso di errore
db.on('error', console.error.bind(console, 'Db Connection error'))
// ascoltiamo UNA VOLTA l'evento 'open' per farci loggare un messaggio quando la connessione al db è riuscita.
db.once('open', () => {
    console.log('Db connected successfully')
})


// mettiamo il nostro server in ascolto sulla nostra porta, loggando un messaggio quando è 'UP'
server.listen(PORT, () => console.log(`Server up and running on port ${PORT}`))
