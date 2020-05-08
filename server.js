const express = require("express")
const Sequelize = require('sequelize')
const axios = require("axios")

const sequelize = new Sequelize('libraries', 'oana', 'oana', {
    dialect: "mysql",
    host: "localhost"
})

sequelize.authenticate().then(() => {
    console.log("Connected to database")
}).catch(() => {
    console.log("Unable to connect to database")
})

//definirea tabelei
const Reservations = sequelize.define('reservations', { 
    clientid: {type: Sequelize.INTEGER, unique: true }, 
    name: Sequelize.STRING,
    book: Sequelize.TEXT,
    date: Sequelize.DATEONLY, 
    period: Sequelize.INTEGER
})

const app = express()
app.use('/', express.static('frontend'))

//GET pentru crearea bazei de date
app.get('/createdb', (request, response) => {
    sequelize.sync({force:true}).then(() => {
        response.status(200).send('Table created')
    }).catch((err) => {
        console.log(err)
        response.status(200).send('Table could not be created')
    })
})

//POST pt adaugarea unei inregistrari noi
app.use(express.json())
app.use(express.urlencoded())

//definire endpoint POST 
app.post('/reservations', (request, response) => {
    Reservations.create(request.body).then((result) => {
        response.status(201).json(result)
    }).catch((error) => {
        response.status(500).send("Reservation not created")
    })
})

//GET pentru a returna rezervarile
app.get('/reservations', (request, response) => {
    Reservations.findAll().then((results) => {
        response.status(200).json(results)
    })
})

app.get('/reservations/:id', (request, response) => {
    Reservations.findByPk(request.params.id).then((result) => {
        if(result) {
            response.status(200).json(result)
        } else {
            response.status(404).send('Reservation not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('Database error')
    })
})

//DELETE 
app.delete('/reservations/:id', (request, response) => {
    Reservations.findByPk(request.params.id).then((message) => {
        if(message) {
            message.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('Database error')
            })
        } else {
            response.status(404).send('Reservation not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('Database error')
    })
})


app.listen(8080)