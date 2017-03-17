'use strict';
const http = require('http')
const fs = require('fs')
const express = require('express')
const app = express()
const path = require('path')
const petsPath = path.join(__dirname, 'pets.json')
const port = 8000
const bodyParser = require('body-parser')


app.disable('x-powered-by')
app.use(bodyParser.json())

app.set('port', process.env.PORT || 8000)


app.get('/pets', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(404)
    }
    let pets = JSON.parse(petsJSON)
    res.send(pets)
  })
})

// app.get('/pets/:id', (req, res) => {
//   fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
//     if (err) {
//       console.error(err.stack);
//       return res.sendStatus(404)
//     }
//     let id = Number.parseInt(req.params.id)
//     let pets = JSON.parse(petsJSON)
//     if (id < 0 || id >= pets.length || Number.isNaN(id)) {
//       return res.sendStatus(404)
//     }
//     res.send(pets[id])
//   })
// })
//
// app.post('/pets', (req, res) => {
//   let pet = req.body
//   console.log(pet);
//   fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
//     if (err) {
//       console.error(err.stack);
//       return res.sendStatus(404)
//     }
//     let pets = JSON.parse(petsJSON)
//     pets.push(pet)
//     res.send(pets)
//     let JSONpet = JSON.stringify(pets)
//     fs.writeFile('pets.json', JSONpet, (err) => {
//       console.log(pet);
//     })
//   })
// })

app.patch('/pets/:id', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(404)
    }
    let pet = req.body
    let id = Number.parseInt(req.params.id)
    let pets = JSON.parse(petsJSON)
    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404)
    }
    if (!pet) return res.sendStatus(400)
    pets[id] = pet
    res.send(pet)
    let JSONpet = JSON.stringify(pets)
    fs.writeFile('pets.json', JSONpet, (err) => {
      console.log(pet);
    })
  })
})

// app.delete('/pets/:id', (req, res) => {
//   fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
//     if (err) {
//       console.error(err.stack);
//       return res.sendStatus(404)
//     }
//     let id = Number.parseInt(req.params.id)
//     let pets = JSON.parse(petsJSON)
//     if (id < 0 || id >= pets.length || Number.isNaN(id)) {
//       return res.sendStatus(404)
//     }
//     let pet = pets.splice(id, 1)[0]
//     res.send(pet)
//     fs.writeFile('pets.json', JSONpet, (err) => {
//       console.log(pets);
//     })
//   })
// })



app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(app.get('port'), () => {
  console.log("listening on", port);
})

module.exports = app
