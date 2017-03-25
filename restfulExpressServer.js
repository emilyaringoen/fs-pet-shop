'use strict'

const http = require('http')
const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const port = 8000
const app = express()

app.disable('x-powered-by')
app.use(bodyParser.json())

app.get('/pets', (req, res) => {
  fs.readFile('pets.json', 'utf8', (err, petsJSON) => {
    if (err) {
      console.error(err.stack)
      return res.sendStatus(404)
    }
    let pets = JSON.parse(petsJSON)
    res.send(pets)
  })
})

app.get('/pets/:id', (req, res) => {
  fs.readFile('pets.json', 'utf8', (err, petsJSON) => {
    if (err) {
      console.error(err.stack)
      return res.sendStatus(404)
    }
    let id = +req.params.id
    let pets = JSON.parse(petsJSON)

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404)
    }

    res.send(pets[id])
  })
})

app.post('/pets', (req, res) => {
  if (req.body.name === '' || req.body.kind === '' || req.body.age === '') {
    res.statusCode = 400
    res.setHeader('Content-Type', 'text/plain')
    return res.end('Bad Request')
  }
  let newPet = {
    age: req.body.age,
    kind: req.body.kind,
    name: req.body.name
  }
  fs.readFile('pets.json', 'utf8', (err, petsJSON) => {
    if (err) {
      console.error(err.stack)
      return res.sendStatus(404)
    }
    let pets = JSON.parse(petsJSON)
    pets.push(newPet)
    res.send(newPet)
    let stringPet = JSON.stringify(pets)
    fs.writeFile('pets.json', stringPet, (err) => {
      console.log(newPet);
    })
  })
})

app.patch('/pets/:id', (req, res) => {
  fs.readFile('pets.json', 'utf8', (err, petsJSON) => {
    if (err) {
      console.error(err.stack)
      return res.sendStatus(404)
    }
    let id = +req.params.id
    let pets = JSON.parse(petsJSON)
    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404)
    }
    for (let key in req.body) {
      pets[id][key] = req.body[key]
    }
    let stringPet = JSON.stringify(pets)
    res.send(pets[id])
    fs.writeFile('pets.json', stringPet, (err) => {
      console.log(pets[id]);
    })
  })
})

app.delete('/pets/:id', (req, res) => {
  fs.readFile('pets.json', 'utf8', (err, petsJSON) => {
    if (err) {
      console.error(err.stack)
      return res.sendStatus(404)
    }
    let id = Number.parseInt(req.params.id)
    let pets = JSON.parse(petsJSON)
    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404)
    }
    let gonePet = pets.splice(id, 1)[0]
    res.send(gonePet)
    let stringPet = JSON.stringify(pets)
    fs.writeFile('pets.json', stringPet, (err) => {
      console.log(pets);
    })
  })
})


app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(port, () => {
  console.log('listening on port: ', port);
})

module.exports = app
